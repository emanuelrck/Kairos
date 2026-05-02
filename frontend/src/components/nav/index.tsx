// Bottom tab bar shared by Dashboard / History / Alerts / Profile.

import React from 'react';
import { KAIROS } from '@/theme';
import type { Go } from '@/types';

const KD = KAIROS;

interface Tab {
  k: string;
  icon?: string;
  center?: boolean;
}

export function TabBar({ active, go }: { active: string; go: Go }) {
  const tabs: Tab[] = [
    { k: 'dashboard', icon: 'home' },
    { k: 'history', icon: 'history' },
    { k: 'fab', center: true },
    { k: 'alert', icon: 'bell' },
    { k: 'profile', icon: 'person' },
  ];

  const Icon = ({ name, color }: { name?: string; color: string }) => {
    const s = { stroke: color, strokeWidth: 2, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
    if (name === 'home') return <svg width="28" height="28" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-3v-7H8v7H5a2 2 0 01-2-2v-9z" {...s} /></svg>;
    if (name === 'history') return <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" {...s} /><path d="M12 8v5l3 2M5 6l-2 1M19 6l2 1" {...s} /></svg>;
    if (name === 'bell') return <svg width="28" height="28" viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16z" {...s} /><path d="M10 20a2 2 0 004 0" {...s} /></svg>;
    if (name === 'person') return <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" {...s} /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" {...s} /></svg>;
    return null;
  };

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'none' }}>
      <div style={{
        position: 'relative', height: 86,
        background: KD.pink.coral,
        borderTopLeftRadius: 26, borderTopRightRadius: 26,
        boxShadow: '0 -8px 26px rgba(217,75,149,0.28)',
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px 22px'
      }}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
          {tabs.slice(0, 2).map((t) => <NavTab key={t.k} t={t} active={active === t.k} onClick={() => go(t.k)} Icon={Icon} />)}
        </div>
        <div style={{ width: 80 }} />
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
          {tabs.slice(3).map((t) => <NavTab key={t.k} t={t} active={active === t.k} onClick={() => go(t.k)} Icon={Icon} />)}
        </div>
      </div>

      <button onClick={() => go('reading1')} style={{
        position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
        width: 60, height: 60, borderRadius: '50%', border: 'none',
        background: KD.pink.coral, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', pointerEvents: 'auto',
        boxShadow: '0 6px 20px rgba(217,75,149,0.50), 0 0 0 4px rgba(255,255,255,0.95)'
      }}>
        <svg width="26" height="26" viewBox="0 0 28 28"><path d="M14 6v16M6 14h16" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

function NavTab({
  t, active, onClick, Icon,
}: {
  t: Tab;
  active: boolean;
  onClick: () => void;
  Icon: (props: { name?: string; color: string }) => React.ReactElement | null;
}) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 4, padding: '10px 12px', minWidth: 48, position: 'relative'
    }}>
      <Icon name={t.icon} color="#fff" />
      <div style={{
        width: 4, height: 4, borderRadius: '50%',
        background: active ? '#fff' : 'transparent',
        marginTop: 2
      }} />
    </button>
  );
}
