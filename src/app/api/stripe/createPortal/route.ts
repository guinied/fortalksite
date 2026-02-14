import { type NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { user, token } = await req.json();
  const userId = user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userResponse = await fetch(
      `https://api.fortalk.app.br/users/getStripeId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    ).then((res) => res.json());

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: userResponse.stripeId,
      return_url: `${req.headers.get("origin")}/`,
    });

    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
