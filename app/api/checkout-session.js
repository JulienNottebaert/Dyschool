import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { priceId, userId } = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: priceId, // ID du plan Stripe
            quantity: 1
          }
        ],
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/abonnement-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/abonnement-cancel`,
        metadata: { userId }
      })

      res.status(200).json({ sessionId: session.id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
