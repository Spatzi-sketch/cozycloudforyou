import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { Modal } from "@/components/ui/Modal";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productSlug: string;
  onSubmit: (email: string) => void | Promise<void>;
  isSubmitting?: boolean;
  message?: { type: "success" | "error"; text: string } | null;
};

export function WaitlistModal({
  isOpen,
  onClose,
  productSlug,
  onSubmit,
  isSubmitting,
  message,
}: WaitlistModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Can't wait for the restock? ☁️"
    >
      <WaitlistForm
        productSlug={productSlug}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        message={message}
      />
      <p className="mt-6 text-xs text-cocoa/50 text-center">
        Trage deine E-Mail-Adresse ein und wir informieren dich, sobald deine
        Lieblingshose wieder verfügbar ist.
      </p>
    </Modal>
  );
}
