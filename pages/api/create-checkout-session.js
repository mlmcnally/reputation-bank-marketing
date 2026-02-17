import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20"
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const appBaseUrl = process.env.APP_BASE_URL;         // e.g. https://reputation-bank-app-v2.vercel.app
    const marketingBaseUrl = process.env.MARKETING_BASE_URL; // e.g. https://www.thereputationbank.com
    const priceId = process.env.STRIPE_PRICE_ID;         // e.g. price_1SLskSBAZDzPNmn2T5KB4mv5

    if (!appBaseUrl || !marketingBaseUrl || !priceId) {
      return res.status(500).json({ error: "Missing required env vars (APP_BASE_URL, MARKETING_BASE_URL, STRIPE_PRICE_ID)." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appBaseUrl}/post-purchase.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${marketingBaseUrl}/pricing?canceled=1`,
      allow_promotion_codes: true
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Stripe error" });
  }
}
