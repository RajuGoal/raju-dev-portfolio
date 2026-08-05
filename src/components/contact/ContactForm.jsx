import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { emailJSConfig } from "../../data/contactData";

export default function ContactForm() {
  const formRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ------------------------
  // Rate Limiting
  // ------------------------
  const MAX_ATTEMPTS = 3;
  const WINDOW_MS = 60000;

  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("contact-rate-limit") || "{}"
    );

    if (
      data.timestamp &&
      Date.now() - data.timestamp < WINDOW_MS &&
      data.count >= MAX_ATTEMPTS
    ) {
      setBlocked(true);
    }
  }, []);

  const attemptSubmit = () => {
    const data = JSON.parse(
      localStorage.getItem("contact-rate-limit") || "{}"
    );

    if (!data.timestamp || Date.now() - data.timestamp > WINDOW_MS) {
      localStorage.setItem(
        "contact-rate-limit",
        JSON.stringify({
          count: 1,
          timestamp: Date.now(),
        })
      );
      return true;
    }

    if (data.count >= MAX_ATTEMPTS) {
      setBlocked(true);
      return false;
    }

    data.count += 1;

    localStorage.setItem(
      "contact-rate-limit",
      JSON.stringify(data)
    );

    return true;
  };

  // ------------------------
  // Sanitizer
  // ------------------------

  const sanitizeInput = (text) => {
    return text
      .replace(/</g, "")
      .replace(/>/g, "")
      .trim();
  };

  // ------------------------
  // Validation
  // ------------------------

  const validate = () => {
    const newErrors = {};

    if (!values.name.trim())
      newErrors.name = "Name is required.";

    if (!values.email.trim())
      newErrors.email = "Email is required.";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    )
      newErrors.email = "Invalid email address.";

    if (!values.subject.trim())
      newErrors.subject = "Subject is required.";

    if (!values.message.trim())
      newErrors.message = "Message is required.";
    else if (values.message.length < 10)
      newErrors.message =
        "Message must be at least 10 characters.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ------------------------
  // Input Change
  // ------------------------

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------------
  // Submit
  // ------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot
    if (honeypot !== "") return;

    if (!validate()) return;

    if (!attemptSubmit()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      values.name = sanitizeInput(values.name);
      values.subject = sanitizeInput(values.subject);
      values.message = sanitizeInput(values.message);

      await emailjs.sendForm(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        formRef.current,
        emailJSConfig.publicKey
      );

      setStatus("success");

      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 flex flex-col gap-4"
    >
      {/* Honeypot */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        autoComplete="off"
        tabIndex="-1"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Name
          </label>

          <input
            name="name"
            required
            value={values.name}
            onChange={handleChange}
            placeholder="Raju Kushwaha"
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:border-amber-400 outline-none"
          />

          {errors.name && (
            <span className="text-red-400 text-xs">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:border-amber-400 outline-none"
          />

          {errors.email && (
            <span className="text-red-400 text-xs">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Subject */}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Subject
        </label>

        <input
          name="subject"
          required
          value={values.subject}
          onChange={handleChange}
          placeholder="Project Subject"
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:border-amber-400 outline-none"
        />

        {errors.subject && (
          <span className="text-red-400 text-xs">
            {errors.subject}
          </span>
        )}
      </div>

      {/* Message */}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Message
        </label>

        <textarea
          rows={5}
          required
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 resize-none focus:border-amber-400 outline-none"
        />

        {errors.message && (
          <span className="text-red-400 text-xs">
            {errors.message}
          </span>
        )}
      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={status === "sending" || blocked}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 disabled:opacity-60 transition"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle size={18} />
          Message sent successfully! I'll get back to you soon.
        </p>
      )}

      {status === "error" && !blocked && (
        <p className="flex items-center gap-2 text-red-400 text-sm">
          <XCircle size={18} />
          Something went wrong. Please try again.
        </p>
      )}

      {blocked && (
        <p className="flex items-center gap-2 text-yellow-400 text-sm">
          <XCircle size={18} />
          Too many attempts. Please wait one minute.
        </p>
      )}
    </form>
  );
}