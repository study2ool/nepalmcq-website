import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Cookie,
  Mail,
  ArrowLeft,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useSEO } from "../hooks/useSEO";

export const PrivacyPolicy: React.FC = () => {
  useSEO({
    title: "Privacy Policy – Nepal MCQ",
    description:
      "Learn how Nepal MCQ collects, uses, and safeguards student personal information, exam performance data, and Google OAuth credentials in accordance with privacy best practices.",
    canonicalPath: "/privacy",
    keywords:
      "privacy policy, student data privacy, Nepal MCQ privacy, exam data security, student terms Nepal",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy – Nepal MCQ",
      url: "https://nepalmcq.edu.np/privacy",
      description: "Official Privacy Policy for Nepal MCQ educational platform.",
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 rounded-3xl border border-indigo-100 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Trust &amp; Transparency Document</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          At Nepal MCQ, we respect student privacy and are committed to protecting
          your personal and academic diagnostic records. This policy outlines our
          transparent practices regarding data collection, storage, and rights.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <span>Effective Date: November 2026</span>
          <span>·</span>
          <span>Version: 2.1 (NEB Centralized Platform)</span>
          <span>·</span>
          <span>Jurisdiction: Nepal</span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <UserCheck className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Information We Collect
            </h2>
          </div>
          <p>
            We adhere to strict data minimization principles. We only collect
            information essential to deliver accurate exam diagnostics, grade
            analytics, and college leaderboard rankings:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Google Authentication Profile
                </strong>
                : When you sign in with Google, we receive your name, verified
                email address, and profile picture avatar. We do not receive or
                store your Google account passwords.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Academic Preferences &amp; School Affiliation
                </strong>
                : Your selected class grade (Grade 11 or Grade 12), academic stream
                (Science or Management), and optional college or school name.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Test Performance &amp; Diagnostic Logs
                </strong>
                : Attempt timestamps, question response selections, accuracy
                percentages, chapter-wise strengths/weaknesses, and time spent
                per question.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Guest &amp; Local Preferences
                </strong>
                : If you practice as an unauthenticated guest, your bookmarked
                questions and question reactions are stored strictly inside your
                browser&apos;s local storage.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Eye className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. How We Use Your Information
            </h2>
          </div>
          <p>
            Your information is used strictly to power educational features:
          </p>
          <ul className="space-y-2 pl-2 list-disc list-inside">
            <li>
              Generating personalized strength and weakness diagnostic reports
              across NEB chapters.
            </li>
            <li>
              Computing national percentile rankings and regional college
              standings on the public leaderboard.
            </li>
            <li>
              Syncing your bookmarked questions and exam attempts across your
              smartphones, tablets, and computers.
            </li>
            <li>
              Analyzing curriculum difficulty to improve explanation derivations
              and fix question ambiguities.
            </li>
            <li>
              Responding promptly to academic feedback and support tickets
              submitted via our contact portal.
            </li>
          </ul>
          <p className="font-semibold text-slate-900 dark:text-white pt-2">
            We never sell, rent, monetize, or broker student personal information
            to third-party advertisers or data brokers.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Lock className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Data Security &amp; Storage
            </h2>
          </div>
          <p>
            We implement industry-grade technical and organizational safeguards:
          </p>
          <ul className="space-y-2 pl-2 list-disc list-inside">
            <li>
              <strong>Encryption in Transit</strong>: All data transmitted between
              your browser and our servers uses modern TLS/HTTPS encryption with
              strict HSTS enforcement.
            </li>
            <li>
              <strong>Enterprise Cloud Infrastructure</strong>: Production databases
              run on managed cloud services with role-based access control and
              continuous automated security patching.
            </li>
            <li>
              <strong>Token Security</strong>: User authentication tokens are
              cryptographically signed and support instant server-side revocation
              upon sign-out.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Cookie className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Cookies &amp; Local Browser Storage
            </h2>
          </div>
          <p>
            Nepal MCQ uses standard browser storage mechanisms exclusively to maintain
            your user session, theme preferences (Dark vs. Light mode), and offline
            practice session continuity. We do not use intrusive cross-site tracking
            cookies or third-party advertising pixels.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Database className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Student Rights &amp; Permanent Account Deletion
            </h2>
          </div>
          <p>
            You retain absolute ownership of your personal data. At any time, you
            have the right to:
          </p>
          <ul className="space-y-2 pl-2 list-disc list-inside">
            <li>Review and modify your registered profile information.</li>
            <li>Export or inspect your historical exam attempt records.</li>
            <li>
              Request the immediate, permanent deletion of your account, scores,
              and personal records via our automated account deletion workflow.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Mail className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Contact Academic &amp; Privacy Support
            </h2>
          </div>
          <p>
            If you have questions, privacy inquiries, or data compliance requests,
            please reach out directly to our team:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs sm:text-sm font-mono">
            <p>
              Email:{" "}
              <a
                href="mailto:study2ool.nepal@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                study2ool.nepal@gmail.com
              </a>
            </p>
            <p>Platform Support: Kathmandu, Bagmati Province, Nepal</p>
            <p>
              Inquiry Desk:{" "}
              <Link
                to="/contact"
                className="text-indigo-600 dark:text-indigo-400 underline font-sans"
              >
                nepalmcq.edu.np/contact
              </Link>
            </p>
          </div>
        </section>
      </div>

      {/* Footer Nav Bar */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <Link
            to="/terms"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline"
          >
            Terms of Service
          </Link>
          <span>·</span>
          <Link
            to="/contact"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline"
          >
            Academic Support
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Nepal MCQ. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
