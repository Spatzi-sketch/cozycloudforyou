"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type RestockButtonProps = {
  productSlug: string;
  restockRound?: number;
  disabled?: boolean;
};

export function RestockButton({
  productSlug,
  restockRound = 1,
  disabled = false,
}: RestockButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleClick = async () => {
    if (window.confirm("Sicher, dass du die Restock-Benachrichtigung für dieses Produkt versenden möchtest? Dies kann nicht rückgängig gemacht werden.")) {
      setLoading(true);
      setMessage(null);
      try {
        const response = await fetch("/api/admin/restock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlug, restockRound }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          setMessage({ type: "error", text: data.message || "Versand fehlgeschlagen." });
        } else {
          setMessage({ type: "success", text: data.message || "Restock-E-Mails versendet." });
        }
      } catch {
        setMessage({ type: "error", text: "Verbindung zum Backend fehlgeschlagen." });
      } finally {
        setLoading(false);
      }
    }
  };

  if (message) {
    const bg = message.type === "success" ? "bg-blush-light border border-blush" : "bg-pink/10 border border-pink";
    const textColor = message.type === "success" ? "text-cocoa" : "text-pink";
    return (
      <div className={`rounded-2xl p-4 ${bg} ${textColor} text-sm mb-4`}>
        {message.text}
      </div>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || loading}
      variant="outline"
    >
      {loading ? "Wird versendet..." : "SEND RESTOCK EMAIL"}
    </Button>
  );
}
