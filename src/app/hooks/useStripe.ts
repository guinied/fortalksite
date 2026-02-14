import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
      );

      setStripe(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  async function createSubscriptionStripeCheckout(checkoutData: any) {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/createSubscriptionCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
        credentials: "include",
      });

      const data = await response.json();

      await (stripe as any).redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("Stripe checkout error:", err);
    }
  }

  async function handleCreateStripePortal(inputData: any) {
    const response = await fetch("/api/stripe/createPortal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
      credentials: "include",
    });

    const data = await response.json();

    window.location.href = data.url;
  }

  return {
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  };
}
