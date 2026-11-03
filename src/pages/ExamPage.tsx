import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { openAuthModal } from "../store/api/authApi";
import { useSEO } from "../hooks/useSEO";
import { Loader2 } from "lucide-react";

export const ExamPage: React.FC = () => {
  useSEO({
    title: "Active Computer-Based Examination Session",
    description:
      "Timed NEB simulation test with independent question countdown, anti-drift exam clock, and question palette.",
    canonicalPath: "/exam",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.quiz.session);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      navigate("/practice", { replace: true });
      return;
    }

    if (!session || session.isSubmitted) {
      navigate("/practice", { replace: true });
    }
  }, [isAuthenticated, session, navigate, dispatch]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] text-slate-400">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Loading examination dialog...</p>
      </div>
    </div>
  );
};

export default ExamPage;
