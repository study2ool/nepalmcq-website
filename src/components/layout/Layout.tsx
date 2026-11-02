import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import { AuthModal } from '../auth/AuthModal';
import { useAppDispatch } from '../../store';
import { fetchCurrentUser } from '../../store/slices/authSlice';
import { fetchSyllabusOverview } from '../../store/slices/syllabusSlice';

export const Layout: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isExamPage = location.pathname.startsWith('/exam/');

  useEffect(() => {
    // 1. Fetch user if token present
    const token = localStorage.getItem('auth_token');
    if (token) {
      dispatch(fetchCurrentUser());
    }

    // 2. Load subjects & syllabus curriculum dynamically from backend
    dispatch(fetchSyllabusOverview());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <ScrollToTop />
      <Navbar />
      <main
        key={location.pathname}
        className="flex-1 flex flex-col page-transition w-full"
      >
        <Outlet />
      </main>
      {!isExamPage && <Footer />}
      <AuthModal />
    </div>
  );
};

export default Layout;
