import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Zap, Compass, User } from 'lucide-react';
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
      label: 'PROFILE',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#050A18]/95 backdrop-blur-xl border-t border-[#1E293B] py-2 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
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
                  ? 'text-[#38BDF8] font-bold' 
                  : 'text-[#64748B] hover:text-[#CBD5E1]'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-[#38BDF8]' : ''}`} />
                    {item.badge && !isActive && (
                      <span className="absolute -top-1.5 -right-3 text-[8px] font-mono font-bold px-1 rounded-full bg-[#0F172A] text-[#8B5CF6] border border-[#8B5CF6]/40">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase mt-0.5">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-sm shadow-[#38BDF8] absolute -bottom-1" />
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

