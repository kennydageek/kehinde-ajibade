import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface InquiryFormProps {
  isDay: boolean;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ isDay }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Contract Role");
  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please add your name and email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/mqernyyd", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as {
          errors?: Array<{ message?: string }>;
          error?: string;
        } | null;
        const message = result?.errors?.map((item) => item.message).filter(Boolean).join(" ")
          || result?.error
          || "The message could not be sent. Please try again.";
        throw new Error(message);
      }

      setSuccess(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The message could not be sent. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-[1.25rem] border transition-all duration-500 overflow-hidden relative ${
      isDay ? "bg-white/96 border-black/12 text-neutral-900 shadow-md" : "bg-black/72 border-white/10 text-white"
    } backdrop-blur-md`}>
      {success ? (
        <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
            <CheckCircle2 size={36} />
          </div>
          <h4 className={`text-2xl font-serif italic leading-tight transition-colors duration-500 ${
            isDay ? "text-neutral-900" : "text-white"
          }`}>Inquiry Sent</h4>
          <p className={`text-sm leading-relaxed max-w-sm ${isDay ? "text-neutral-700" : "text-neutral-300"}`}>
            Thank you for reaching out, <strong>{name}</strong>! Your <strong>{category}</strong> inquiry has been sent to Kehinde's inbox.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setName("");
              setEmail("");
              setDetails("");
              setError("");
            }}
            className="focus-ring px-5 py-2.5 bg-primary text-black font-semibold text-sm rounded-full hover:opacity-90 transition-all cursor-pointer mt-4"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form
          action="https://formspree.io/f/mqernyyd"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
          aria-busy={isSubmitting}
        >
          <input type="hidden" name="_subject" value={`Portfolio inquiry: ${category}`} />
          <input
            className="hidden"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="space-y-1">
            <span className={`text-sm font-semibold block ${isDay ? "text-neutral-700" : "text-primary"}`}>
              Collaboration
            </span>
            <h3 className="text-3xl font-serif italic font-normal tracking-[-0.015em] leading-tight">Start a Conversation</h3>
            <p className={`text-sm leading-relaxed max-w-md transition-colors duration-500 ${
              isDay ? "text-neutral-700" : "text-neutral-200"
            }`}>
              Reach out for senior frontend roles, product contracts, frontend architecture, AI experiences, or API-driven application work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="inquiry-name" className={`text-sm font-semibold block transition-colors duration-500 ${
                isDay ? "text-neutral-800 font-bold" : "text-neutral-100"
              }`}>Your Name *</label>
              <input
                id="inquiry-name"
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                placeholder="Your name"
                className={`focus-ring w-full border rounded-lg p-3 text-base outline-none transition-all fill-none ${
                  isDay 
                    ? "bg-black/5 border-black/10 text-neutral-950 placeholder-neutral-600 focus:border-neutral-900" 
                    : "bg-white/8 border-white/18 text-white placeholder-neutral-200 focus:border-primary"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="inquiry-email" className={`text-sm font-semibold block transition-colors duration-500 ${
                isDay ? "text-neutral-800 font-bold" : "text-neutral-100"
              }`}>Email Address *</label>
              <input
                id="inquiry-email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                placeholder="name@company.com"
                className={`focus-ring w-full border rounded-lg p-3 text-base outline-none transition-all fill-none ${
                  isDay 
                    ? "bg-black/5 border-black/10 text-neutral-950 placeholder-neutral-600 focus:border-neutral-900" 
                    : "bg-white/8 border-white/18 text-white placeholder-neutral-200 focus:border-primary"
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <span id="inquiry-category-label" className={`text-sm font-semibold block transition-colors duration-500 ${
              isDay ? "text-neutral-800 font-bold" : "text-neutral-100"
            }`}>Opportunity Type</span>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="inquiry-category-label">
              {["Contract Role", "Full-Time Position", "Consultancy Advice", "General Chat"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  disabled={isSubmitting}
                  aria-pressed={category === c}
                  style={{
                    color: category === c
                      ? (isDay ? "#ffffff" : "#000000")
                      : (isDay ? "#171914" : "#f5f7ee"),
                  }}
                  className={`focus-ring px-3.5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    category === c
                      ? (isDay ? "bg-neutral-900 text-white shadow" : "bg-[#DEDBC8] text-black font-extrabold")
                      : (isDay ? "bg-black/5 text-neutral-950 hover:bg-black/10 border border-black/5" : "bg-white/8 text-neutral-100 hover:bg-white/12 border border-white/12")
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <input type="hidden" name="category" value={category} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="inquiry-message" className={`text-sm font-semibold block transition-colors duration-500 ${
              isDay ? "text-neutral-800 font-bold" : "text-neutral-100"
            }`}>Project Scope (Optional)</label>
            <textarea
              id="inquiry-message"
              name="message"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={isSubmitting}
              placeholder="Share the role, project goals, stack, timeline, or anything useful."
              rows={4}
              className={`focus-ring w-full border rounded-lg p-3 text-base outline-none transition-all resize-none ${
                isDay 
                  ? "bg-black/5 border-black/10 text-neutral-950 placeholder-neutral-600 focus:border-neutral-900" 
                  : "bg-white/8 border-white/18 text-white placeholder-neutral-200 focus:border-primary"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inquiry-submit focus-ring w-full py-3 font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Sending inquiry…" : "Send inquiry"}</span>
            <Send size={12} className="stroke-[2.5]" />
          </button>

          {error && (
            <p role="alert" className={`text-xs leading-relaxed ${isDay ? "text-red-700" : "text-red-300"}`}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};
