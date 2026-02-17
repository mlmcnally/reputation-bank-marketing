import { useState } from "react";

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    try {
      setLoading(true);
      const res = await fetch("/api/create-checkout-session", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");
      window.location.href = data.url; // Stripe-hosted Checkout
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 920, margin: "40px auto", padding: "0 16px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ marginBottom: 8 }}>Pricing</h1>
      <p style={{ marginTop: 0, lineHeight: 1.5 }}>
        Subscribe to access the full interactive Reputation Bank app.
      </p>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18, maxWidth: 520 }}>
        <h2 style={{ marginTop: 0 }}>Full Access Subscription</h2>
        <ul style={{ lineHeight: 1.7 }}>
          <li>All exercises + saved progress</li>
          <li>Continuous product improvements</li>
          <li>Secure login</li>
        </ul>

        <button
          onClick={startCheckout}
          disabled={loading}
          style={{
            marginTop: 10,
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid #111",
            background: loading ? "#eee" : "#111",
            color: loading ? "#333" : "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: 16
          }}
        >
          {loading ? "Redirecting…" : "Buy now"}
        </button>

        <p style={{ fontSize: 12, opacity: 0.75, marginTop: 10 }}>
          After purchase you’ll be routed into the app to complete account setup.
        </p>
      </div>
    </main>
  );
}
