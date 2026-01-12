"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setIsSubmitting(true);
    try {
      router.push(`/boka?code=${encodeURIComponent(trimmed)}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Vagnbokning</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Ange din förkunnarkod för att boka ett pass (och få det tillagt i ditt schema).
      </p>

      <div className="card" style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Förkunnarkod</h2>
        <form onSubmit={onSubmit} className="row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="t.ex. AB12CD"
            aria-label="Förkunnarkod"
            style={{ flex: "1 1 220px" }}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Öppnar..." : "Fortsätt"}
          </button>
        </form>
        <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>
          Admin? Gå till <a href="/admin/login">/admin/login</a>.
        </p>
      </div>
    </main>
  );
}

