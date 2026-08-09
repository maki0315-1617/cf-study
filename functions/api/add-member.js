export async function onRequestPost(context) {
  try {
    const { name, role } = await context.request.json();
    if (!name || !role) return new Response("入力エラー", { status: 400 });

    await context.env.DB.prepare(
      "INSERT INTO members (name, role) VALUES (?, ?)"
    ).bind(name, role).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
