import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Building2,
  GraduationCap,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { useAppSelector } from "../store";
import SearchableSelect from "../components/common/SearchableSelect";
import {
  useSubmitContactInquiryMutation,
  type ContactInquiry,
} from "../store/api/apiSlice";

const INQUIRY_CATEGORIES = [
  { value: "question_feedback", label: "Question Bank & Answer Key Feedback" },
  { value: "technical_issue", label: "Technical or Platform Issue" },
  { value: "college_partnership", label: "College / School Partnership" },
  { value: "curriculum_request", label: "Curriculum & Syllabus Suggestions" },
  { value: "account_support", label: "Account & Progress Data Support" },
  { value: "general", label: "General Inquiry" },
];

const ROLES = [
  { value: "student_11", label: "Grade 11 Student" },
  { value: "student_12", label: "Grade 12 Student" },
  { value: "teacher", label: "Subject Teacher / Educator" },
  { value: "college_admin", label: "School / College Administrator" },
  { value: "other", label: "Guardian / Other" },
];

const FAQS = [
  {
    question: "How do I report a typo, wrong option, or flawed explanation?",
    answer:
      "You can submit feedback right here selecting 'Question Bank & Answer Key Feedback' with the Question ID (found on every question card), or write to us directly. Our academic review team verifies every report against CDC textbooks and NEB answer keys.",
  },
  {
    question: "Can our college or +2 school be added to the National Leaderboard?",
    answer:
      "Yes! When students sign in and select their college during onboarding, their examination scores automatically aggregate to their institution's points. If your institution is not listed, choose 'Other Institution' or contact us to officially register your college profile.",
  },
  {
    question: "Is Nepal MCQ completely free for Grade 11 & 12 students?",
    answer:
      "Yes. Nepal MCQ is 100% free for all students across Nepal. All practice questions, NEB mock examinations, timer simulations, and syllabus maps are accessible without any subscription fees.",
  },
  {
    question: "How are the questions aligned with the latest NEB specification grid?",
    answer:
      "All 1,700+ questions are strictly categorized by NEB Grade 11 & 12 CDC curriculum units, chapters, and subtopics, mirroring official board question formats, difficulty weighting, and marking schemes (+1.0 mark per correct answer).",
  },
];

export const Contact: React.FC = () => {
  useSEO({
    title: "Contact Us & Academic Support - Nepal MCQ",
    description:
      "Reach out to the Nepal MCQ academic team for question feedback, syllabus suggestions, college partnerships, or technical support.",
    canonicalPath: "/contact",
  });

  const currentUser = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [category, setCategory] = useState("question_feedback");
  const [role, setRole] = useState(
    currentUser?.grade === 11
      ? "student_11"
      : currentUser?.grade === 12
      ? "student_12"
      : "student_12",
  );
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactInquiry | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [submitContactInquiry, { isLoading: isSubmitting }] =
    useSubmitContactInquiryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    setSubmitError(null);
    try {
      const selectedCatLabel =
        INQUIRY_CATEGORIES.find((c) => c.value === category)?.label || "General Inquiry";
      const resolvedSubject =
        subject.trim() || `[${selectedCatLabel}] Inquiry from ${name.trim()}`;

      const res = await submitContactInquiry({
        name: name.trim(),
        email: email.trim(),
        category,
        role,
        subject: resolvedSubject,
        message: message.trim(),
        source: "website",
      }).unwrap();

      setSubmittedInquiry(res);
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(
        err?.data?.error ||
          err?.message ||
          "Failed to submit your inquiry. Please try again or email us directly.",
      );
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setSubmittedInquiry(null);
    setMessage("");
    setSubject("");
  };

  const handleDirectEmail = () => {
    const selectedCatLabel =
      INQUIRY_CATEGORIES.find((c) => c.value === category)?.label || "Inquiry";
    const mailtoUrl = `mailto:contact@nepalmcq.edu.np?subject=${encodeURIComponent(
      `[${selectedCatLabel}] ${subject || "Nepal MCQ Inquiry"}`,
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nRole: ${role}\nCategory: ${selectedCatLabel}\n\nMessage:\n${message}`,
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Support &amp; Academic Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          We&apos;re Here to Help
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Have feedback on a question, need assistance with your college
          account, or want to collaborate? Connect directly with the Nepal MCQ
          team.
        </p>
      </div>

      {/* Support Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Email Support
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                For questions, feedback, and academic verification
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href="mailto:contact@nepalmcq.edu.np"
              className="text-xs sm:text-sm font-semibold font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
            >
              <span>contact@nepalmcq.edu.np</span>
            </a>
            <span className="text-[11px] text-slate-400 block mt-1">
              Typical response within 24 hours
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Location &amp; Curriculum
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                CDC Aligned Examination Operations
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              Kathmandu, Bagmati Province
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Aligned with NEB +2 Curriculum Specification Grid
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Operating Hours
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Online examination system availability
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              24/7 Platform Access
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Student support Mon–Sat: 8:00 AM – 8:00 PM NPT
            </span>
          </div>
        </div>
      </div>

      {/* Main Form & Guidelines Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Inquiry Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong>. Our academic review team has logged your message and will reach out to <strong className="text-slate-900 dark:text-white">{email}</strong> if follow-up is needed.
              </p>

              {submittedInquiry && (
                <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-left text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Reference Tracking ID</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm">
                      #{submittedInquiry.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Category</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                      {submittedInquiry.category.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Status</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Logged in Queue
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDirectEmail}
                  className="px-4 py-2.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                >
                  Send via Email Client
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send a Message
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fill out the form below. We appreciate all constructive feedback on questions and the curriculum.
                </p>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <div className="space-y-1">
                    <p className="font-semibold">{submitError}</p>
                    <p className="text-[11px] opacity-90">
                      You can also email us directly at{" "}
                      <a
                        href="mailto:contact@nepalmcq.edu.np"
                        className="underline font-semibold"
                      >
                        contact@nepalmcq.edu.np
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aayush Sharma"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <SearchableSelect
                    options={INQUIRY_CATEGORIES}
                    value={category}
                    onChange={(val) => setCategory(String(val))}
                    placeholder="Select topic..."
                    className="w-full"
                    buttonClassName="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Your Role / Level
                  </label>
                  <SearchableSelect
                    options={ROLES}
                    value={role}
                    onChange={(val) => setRole(String(val))}
                    placeholder="Select role..."
                    className="w-full"
                    buttonClassName="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Physics Q#PHY_042 typo in Option C"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {message.length}/1000
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, feedback, question ID, or partnership details clearly..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400">
                  We never share your email address. Educational use only.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Quick Links & FAQ Accordion */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Help Card */}
          <div className="bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-lg space-y-4 border border-indigo-800/50">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Looking for Quick Solutions?</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Instant Academic Resources
            </h3>
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              Before submitting, you might find the answers or study tools you need in our dedicated resource centers:
            </p>
            <div className="space-y-2 pt-1">
              <Link
                to="/practice"
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-xs font-semibold"
              >
                <span>Launch Timed Mock Exam</span>
                <span className="text-indigo-300">&rarr;</span>
              </Link>
              <Link
                to="/subjects"
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-xs font-semibold"
              >
                <span>Browse Grade 11 &amp; 12 Syllabi</span>
                <span className="text-indigo-300">&rarr;</span>
              </Link>
              <Link
                to="/leaderboard"
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-xs font-semibold"
              >
                <span>Check College Rankings</span>
                <span className="text-indigo-300">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {FAQS.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div key={index} className="py-3 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors gap-2"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-indigo-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed animate-in fade-in duration-150">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

