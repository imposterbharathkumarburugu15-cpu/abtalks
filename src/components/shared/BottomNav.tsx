import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Zap, Compass, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../../types';

interface BottomNavProps {
  student: StudentProfile;
}

export const BottomNav: React.FC<BottomNavProps> = ({ student }) => {
  const currentMissionDay = student.currentDay || 12;

  const navItems = [
    {
      to: '/',
      label: 'HOME',
      icon: Home,
      exact: true
    },
    {
      to: `/day/${currentMissionDay}`,
      label: 'BUILDS',
      icon: Zap,
      badge: `D${currentMissionDay}`
    },
    {
      to: '/dashboard',
      label: 'JOURNEY',
      icon: Compass,
      exact: true
    },
    {
      to: '/proofs',
      label: 'PROOF',
      icon: ShieldCheck
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090B0D]/95 backdrop-blur-md border-t border-[#252C2E] py-2 px-3">
      <div className="max-w-[390px] mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `
                flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all relative font-mono font-medium cursor-pointer active:scale-95
                ${isActive 
                  ? 'text-[#69B39A] font-bold' 
                  : 'text-[#A6AAA8] hover:text-[#F1EEE7]'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-[#69B39A]' : ''}`} />
                    {item.badge && !isActive && (
                      <span className="absolute -top-1.5 -right-3 text-[8px] font-mono font-bold px-1 rounded-full bg-[#14191B] text-[#69B39A] border border-[#252C2E]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase mt-0.5">{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#69B39A] absolute -bottom-1" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};


