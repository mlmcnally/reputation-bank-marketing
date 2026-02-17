import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 920, margin: "40px auto", padding: "0 16px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ marginBottom: 8 }}>The Reputation Bank</h1>
      <p style={{ lineHeight: 1.5, marginTop: 0 }}>
        A communications & reputation scenario planning tool with 100 pages of learning content and 15 planning exercises.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <Link href="/pricing">View Pricing</Link>
        <a href={process.env.NEXT_PUBLIC_APP_URL} target="_blank" rel="noreferrer">
          Go to App
        </a>
      </div>

      <hr style={{ margin: "28px 0" }} />

      <h2>What you get</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>Stakeholder mapping across identities, ambitions, roles</li>
        <li>Credibility deposits & withdrawals planning</li>
        <li>Saved progress across exercises</li>
      </ul>
    </main>
  );
}
