export async function POST (req) {
  try {
    const body = await req.text()
    console.log('Raw body received:', body) // Affiche tout ce qui arrive
    console.log('Headers received:', req.headers) // Affiche les headers

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error handling webhook:', err)
    return new Response('Webhook error', { status: 500 })
  }
}
