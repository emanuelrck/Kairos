# Arranca backend (Weld SE + HttpServer JDK) + frontend (Vite) em paralelo.
# Usa: .\run.ps1   (Ctrl+C para os dois)

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

# Auto-detecta JDK / Maven
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    $jdk = Get-ChildItem 'C:\Program Files\Eclipse Adoptium' -Directory -ErrorAction SilentlyContinue |
           Where-Object { $_.Name -match '^jdk-' } | Select-Object -First 1
    if (-not $jdk) {
        $jdk = Get-ChildItem "$env:USERPROFILE\Downloads" -Directory -ErrorAction SilentlyContinue |
               Where-Object { $_.Name -match '^jdk-' } | Select-Object -First 1
    }
    if ($jdk) { $env:JAVA_HOME = $jdk.FullName; $env:Path = "$($jdk.FullName)\bin;$env:Path" }
}
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    $mvn = Get-ChildItem "$env:USERPROFILE\Downloads" -Directory -ErrorAction SilentlyContinue |
           Where-Object { $_.Name -match '^apache-maven-' } | Select-Object -First 1
    if ($mvn) { $env:MAVEN_HOME = $mvn.FullName; $env:Path = "$($mvn.FullName)\bin;$env:Path" }
}

# Carrega .env
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^\s*([^#=]+)=(.*)$') {
            $name = $Matches[1].Trim()
            $value = $Matches[2].Trim().Trim('"').Trim("'")
            Set-Item -Path "Env:$name" -Value $value
        }
    }
}

if (-not $env:OPENAI_API_KEY) {
    Write-Host "OPENAI_API_KEY nao esta definida (verifica o .env na raiz)." -ForegroundColor Red
    exit 1
}

$frontendDir = Join-Path $PSScriptRoot 'frontend'
$backendDir  = Join-Path $PSScriptRoot 'jakarta ee'

if (-not (Test-Path (Join-Path $frontendDir 'node_modules'))) {
    Write-Host '[frontend] npm install...'
    Push-Location $frontendDir
    npm install --silent
    Pop-Location
}

# Lanca cada servico como Job (corre em runspace separado dentro do mesmo processo)
$backendJob = Start-Job -Name 'kairos-backend' -ScriptBlock {
    param($dir, $apiKey, $javaHome, $path)
    $env:OPENAI_API_KEY = $apiKey
    if ($javaHome) { $env:JAVA_HOME = $javaHome }
    $env:Path = $path
    Set-Location $dir
    & mvn -q exec:java '-Dkairos.main=pt.kairos.maternal.web.WebServer' 2>&1
} -ArgumentList $backendDir, $env:OPENAI_API_KEY, $env:JAVA_HOME, $env:Path

$frontendJob = Start-Job -Name 'kairos-frontend' -ScriptBlock {
    param($dir, $path)
    $env:Path = $path
    Set-Location $dir
    & npm run dev 2>&1
} -ArgumentList $frontendDir, $env:Path

Write-Host ''
Write-Host 'Backend:  http://localhost:9080/api/chat' -ForegroundColor Cyan
Write-Host 'Frontend: http://localhost:5173' -ForegroundColor Cyan
Write-Host 'Ctrl+C para parar.' -ForegroundColor Yellow
Write-Host ''

try {
    while ($true) {
        Receive-Job -Job $backendJob, $frontendJob | ForEach-Object { Write-Host $_ }
        if ($backendJob.State  -ne 'Running' -and $frontendJob.State -ne 'Running') { break }
        Start-Sleep -Milliseconds 400
    }
}
finally {
    Write-Host ''
    Write-Host 'A parar servicos...' -ForegroundColor Yellow
    Stop-Job   -Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Receive-Job -Job $backendJob, $frontendJob -ErrorAction SilentlyContinue | Out-Null
    Remove-Job -Job $backendJob, $frontendJob -Force -ErrorAction SilentlyContinue
}
