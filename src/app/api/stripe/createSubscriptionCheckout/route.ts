/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
import { type NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { product, user, token } = await req.json();

  let price: string;

  switch (product) {
    case "Basic":
      price = "price_1SMtqDBVtJsR6LRbbmijnfxt";
      break;
    case "Professional":
      price = "price_1SMtquBVtJsR6LRb3m3vsJb9";
      break;
    case "Enterprise":
      price = "price_1SMtrSBVtJsR6LRbPw6Ttd1g";
      break;
    default:
      return NextResponse.json(
        { error: "Invalid product selected" },
        { status: 400 }
      );
  }

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  let userStripeId: string;

  const metadata = {
    price: price,
    userId: user.id.toString(),
    organizationId: user.organizationId?.toString() || "",
    plan: product,
    email: user.email,
  };

  try {
    if (!user.stripeId || user.stripeId === "" || user.stripeId === null) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        ...(user.name && { name: user.name }),
        metadata: {
          userId: user.id.toString(),
          organizationId: user.organizationId?.toString() || "",
          email: user.email,
        },
      });

      await fetch(`https://api.fortalk.app.br/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stripeId: stripeCustomer.id,
          organizationId: Number(user.organizationId),
        }),
        credentials: "include",
      });

      userStripeId = stripeCustomer.id;
    } else {
      userStripeId = user.stripeId;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "boleto"],
      line_items: [{ price: price, quantity: 1 }],
      success_url: `${req.headers.get("origin")}/`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata,
      customer: userStripeId,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
