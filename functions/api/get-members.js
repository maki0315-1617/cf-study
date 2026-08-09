export async function onRequestGet(context) {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM members ORDER BY id DESC"
    ).all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
