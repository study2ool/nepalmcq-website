import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  ShieldAlert,
  Scale,
  Award,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Mail,
} from "lucide-react";
import { useSEO } from "../hooks/useSEO";

export const TermsOfService: React.FC = () => {
  useSEO({
    title: "Terms of Service – Nepal MCQ",
    description:
      "Review the official Terms of Service, Academic Honor Code, and acceptable use guidelines governing the Nepal MCQ examination and syllabus practice platform.",
    canonicalPath: "/terms",
    keywords:
      "terms of service, terms and conditions, Nepal MCQ terms, academic honor code, student agreement Nepal",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service – Nepal MCQ",
      url: "https://nepalmcq.edu.np/terms",
      description:
        "Official Terms of Service for Nepal MCQ educational platform.",
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
          <Scale className="w-3.5 h-3.5" />
          <span>Official Legal Agreement &amp; Student Honor Code</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Welcome to Nepal MCQ. By accessing our platform, practicing questions,
          or sitting for mock examinations, you agree to comply with and be
          bound by these Terms of Service.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <span>Effective Date: November 2026</span>
          <span>·</span>
          <span>Version: 2.1</span>
          <span>·</span>
          <span>Governing Law: Federal Democratic Republic of Nepal</span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Platform Purpose &amp; Academic Scope
            </h2>
          </div>
          <p>
            Nepal MCQ is an educational computer-based testing (CBT) and
            syllabus practice platform designed to assist Grade 11 &amp; 12
            students in Nepal preparing for National Examinations Board (NEB)
            curriculum exams and professional entrance qualifications (IOE,
            CEE).
          </p>
          <p>
            While our question banks, specification grids, and model questions
            are meticulously aligned with Curriculum Development Centre (CDC)
            frameworks, Nepal MCQ is an independent learning platform. Official
            examinations and certifications remain under the exclusive
            jurisdiction of the National Examinations Board.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Award className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Student Academic Honor Code
            </h2>
          </div>
          <p>
            Academic integrity is central to our learning community. When taking
            timed examinations and competing on the national or college
            leaderboards, you agree to:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span>
                Attempt mock tests independently without automated scripts,
                answer scrapers, or cheating software.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span>
                Maintain honest representation of your academic identity, class
                grade, and school or college affiliation.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span>
                Use feedback channels constructively to point out genuine
                errata, ambiguous questions, or formula typos.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <ShieldAlert className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Acceptable Use &amp; Prohibited Conduct
            </h2>
          </div>
          <p>You agree not to:</p>
          <ul className="space-y-2 pl-2 list-disc list-inside">
            <li>
              Attempt to manipulate leaderboard rankings, falsify scorecards, or
              submit automated artificial requests to our APIs.
            </li>
            <li>
              Scrape, crawl, or mass-download question collections or syllabus
              assets for unauthorized commercial exploitation.
            </li>
            <li>
              Interfere with or disrupt the security, availability, or integrity
              of the platform&apos;s infrastructure.
            </li>
            <li>
              Submit defamatory, abusive, or harmful content through feedback or
              inquiry forms.
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-rose-600 dark:text-rose-400 font-semibold pt-1">
            Violation of acceptable use guidelines may result in immediate score
            invalidation, leaderboard disqualification, or account suspension.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Intellectual Property &amp; Curriculum Attribution
            </h2>
          </div>
          <p>
            The software, user interface design, diagnostic algorithms, and
            step-by-step derivations created by Nepal MCQ are the intellectual
            property of the platform.
          </p>
          <p>
            Official curriculum specification grids and standard past board
            problem patterns are referenced in accordance with fair educational
            use to help students navigate the prescribed national curriculum.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Disclaimers &amp; Limitation of Liability
            </h2>
          </div>
          <p>
            The platform and its content are provided on an &quot;as is&quot;
            and &quot;as available&quot; basis for educational study. While we
            strive for absolute pedagogical accuracy across all physics,
            chemistry, mathematics, and management solutions, we do not
            guarantee that every question or explanation is entirely free of
            typographical errors.
          </p>
          <p>
            Nepal MCQ and its team shall not be liable for any indirect,
            consequential, or exam-related outcomes resulting from reliance on
            the service. Students are encouraged to cross-reference with
            official CDC textbooks and teacher instruction.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Mail className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Governing Law &amp; Inquiries
            </h2>
          </div>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of Nepal. Any disputes arising in connection with these
            Terms shall be subject to the exclusive jurisdiction of the courts
            of Nepal.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs sm:text-sm font-mono">
            <p>
              Legal &amp; Support Contact:{" "}
              <a
                href="mailto:study2ool.nepal@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                study2ool.nepal@gmail.com
              </a>
            </p>
            <p>Headquarters: Kathmandu, Bagmati Province, Nepal</p>
          </div>
        </section>
      </div>

      {/* Footer Nav Bar */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <Link
            to="/privacy"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline"
          >
            Privacy Policy
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

export default TermsOfService;
