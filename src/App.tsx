import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProfile } from './types';
import { getStoredStudent } from './utils/storage';
import { Header } from './components/shared/Header';
import { BottomNav } from './components/shared/BottomNav';
import { ABCoach } from './components/shared/ABCoach';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengeDayPage } from './pages/ChallengeDayPage';
import { ProofVaultPage } from './pages/ProofVaultPage';

export default function App() {
  const [student, setStudent] = useState<StudentProfile>(getStoredStudent());

  const handleStudentUpdate = (updated: StudentProfile) => {
    setStudent({ ...updated });
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans">
        {/* Persistent App Header */}
        <Header student={student} onStudentUpdate={handleStudentUpdate} />

        {/* Main Content View Container */}
        <main className="flex-1 w-full">
          <Routes>
            <Route
              path="/"
              element={<LandingPage student={student} onStudentUpdate={handleStudentUpdate} />}
            />
            <Route
              path="/dashboard"
              element={<DashboardPage student={student} onStudentUpdate={handleStudentUpdate} />}
            />
            <Route
              path="/day/:dayId"
              element={<ChallengeDayPage student={student} onStudentUpdate={handleStudentUpdate} />}
            />
            <Route
              path="/proofs"
              element={<ProofVaultPage student={student} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Contextual AI Build Companion */}
        <ABCoach student={student} onStudentUpdate={handleStudentUpdate} />

        {/* Persistent Mobile Bottom Navigation Bar */}
        <BottomNav student={student} />
      </div>
    </BrowserRouter>
  );
}
