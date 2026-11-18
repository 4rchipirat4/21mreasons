import { useState } from "react";

const O  = "#F7931A";
const D2 = "#111111";
const D3 = "#1A1A1A";
const G0 = "#2A2A2A";
const G3 = "#8A8A8A";
const G4 = "#B0B0B0";
const W2 = "#E8E8E8";
const W  = "#FFFFFF";

const TOPICS = [
  { value: "do-and-dont", label: "What to do and what not to do" },
  { value: "custody-setup", label: "Custody setup" },
  { value: "personal-situation", label: "How Bitcoin applies to my situation" },
];

const SERVICES = [
  {
    title: "What to do — and what not to do",
    body: "Common mistakes, scams, exchange risk, and how to handle a seed phrase. The aim is that you can tell a sound setup from a dangerous one, and know which shortcuts to avoid.",
  },
  {
    title: "Custody, step by step",
    body: "A hardware wallet, multisig, running a node, Lightning — walked through in an order that fits how you actually use Bitcoin. The steps are tailored to you, not a generic checklist.",
  },
  {
    title: "How Bitcoin applies to you",
    body: "Savings, inflation, time horizon, and self-sovereignty, tied to your circumstances. The same fundamentals, applied to your situation rather than left as slogans.",
  },
];

export default function WorkWithUs() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    // Netlify needs urlencoded body, including the form-name field already in the form.
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
    }
  }

  const field = {
    width: "100%",
    background: D3,
    color: W2,
    border: `1px solid ${G0}`,
    borderRadius: 3,
    padding: "10px 12px",
    fontFamily: "var(--sans)",
    fontSize: 14,
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: G4,
    fontFamily: "var(--mono)",
    marginBottom: 6,
  };

  return (
    <div className="work-page" style={{
      maxWidth: 860,
      margin: "0 auto",
      padding: "32px 20px 48px",
    }}>
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        color: O,
        fontWeight: 700,
        marginBottom: 8,
      }}>21M REASONS</div>
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: G4,
        fontWeight: 600,
        marginBottom: 14,
      }}>Work with us</div>
      <h1 style={{
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 800,
        color: W,
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        marginBottom: 14,
        maxWidth: 720,
      }}>Bitcoin doesn't have a helpdesk.<br />So we made one.</h1>
      <p style={{
        fontSize: 17,
        lineHeight: 1.55,
        color: W2,
        maxWidth: 640,
        marginBottom: 16,
      }}>
        Years of experience, distilled and delivered, drop by drop.
      </p>
      <p style={{
        fontSize: 15,
        lineHeight: 1.65,
        color: G4,
        maxWidth: 640,
        marginBottom: 28,
      }}>
        21M Reasons can walk you through the practical side of Bitcoin: what to do, what not to do, and how to set things up for your own situation. This is education and a conversation, not a product pitch.
      </p>

      <div className="work-services" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginBottom: 24,
      }}>
        {SERVICES.map((s) => (
          <div key={s.title} style={{
            background: D2,
            border: `1px solid ${D3}`,
            borderTop: `2px solid ${O}`,
            padding: "18px 16px 20px",
          }}>
            <h2 style={{
              fontSize: 15,
              fontWeight: 700,
              color: W,
              marginBottom: 10,
              lineHeight: 1.3,
            }}>{s.title}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: G4 }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div style={{
        background: D2,
        border: `1px solid ${D3}`,
        padding: "12px 16px",
        marginBottom: 36,
        fontSize: 13,
        lineHeight: 1.55,
        color: G3,
      }}>
        Education and general information only, not financial, tax or legal advice.
      </div>

      <h2 style={{
        fontSize: 20,
        fontWeight: 800,
        color: W,
        letterSpacing: "-0.02em",
        marginBottom: 6,
      }}>Get in touch</h2>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: G4, marginBottom: 20, maxWidth: 560 }}>
        Tell us what you need help with and a little about your situation. We'll reply to the email you give.
      </p>

      {status === "sent" ? (
        <div style={{
          background: D2,
          border: `1px solid ${G0}`,
          padding: "20px 16px",
          color: W2,
          fontSize: 15,
          lineHeight: 1.6,
        }}>
          Thanks. We'll reply to the email you gave.
        </div>
      ) : (
        <form
          name="work-with-us"
          method="POST"
          action="/"
          onSubmit={onSubmit}
          style={{ maxWidth: 560 }}
        >
          <input type="hidden" name="form-name" value="work-with-us" />
          {/* Honeypot: present in the DOM, hidden from people. */}
          <p className="work-hp" aria-hidden="true">
            <label>
              Don't fill this out if you're human:
              <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="work-name" style={labelStyle}>Name</label>
            <input id="work-name" name="name" type="text" required autoComplete="name" style={field}
              onFocus={(e) => { e.currentTarget.style.borderColor = O; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G0; }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="work-email" style={labelStyle}>Email</label>
            <input id="work-email" name="email" type="email" required autoComplete="email" style={field}
              onFocus={(e) => { e.currentTarget.style.borderColor = O; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G0; }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="work-topic" style={labelStyle}>What do you need help with</label>
            <select id="work-topic" name="topic" required defaultValue="" style={{ ...field, appearance: "auto" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = O; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G0; }}
            >
              <option value="" disabled>Choose one</option>
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="work-message" style={labelStyle}>Message</label>
            <textarea id="work-message" name="message" required rows={6} style={{ ...field, resize: "vertical", lineHeight: 1.5 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = O; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G0; }}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              background: O,
              color: "#000000",
              border: "none",
              borderRadius: 3,
              padding: "11px 22px",
              fontFamily: "var(--sans)",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.02em",
              cursor: status === "sending" ? "default" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sending" ? "Sending..." : "Get in touch"}
          </button>

          {status === "error" && (
            <p style={{ marginTop: 14, fontSize: 13, color: "#FF6666", lineHeight: 1.5 }}>
              Couldn't send just now. Please try again in a moment.
            </p>
          )}
        </form>
      )}

      <style>{`
        .work-hp {
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        .work-page input:focus, .work-page select:focus, .work-page textarea:focus {
          border-color: ${O};
        }
        @media (max-width: 768px) {
          .work-services { grid-template-columns: 1fr !important; }
          .work-page { padding: 24px 16px 40px !important; }
        }
      `}</style>
    </div>
  );
}
