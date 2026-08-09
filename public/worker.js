export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // URLが「/api/get-members」だった場合、D1からデータを取得してReactに返す
    if (url.pathname === "/api/get-members") {
      try {
        const { results } = await env.DB.prepare(
          "SELECT * FROM members ORDER BY id DESC"
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    // URLが「/api/add-member」だった場合、画面から届いた名前をD1に保存する
    if (url.pathname === "/api/add-member") {
      try {
        const { name, role } = await request.json();
        if (!name || !role) return new Response("入力エラー", { status: 400 });

        await env.DB.prepare(
          "INSERT INTO members (name, role) VALUES (?, ?)"
        ).bind(name, role).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    // API以外のアクセス（通常の画面アクセス）は、そのままReactの画面を表示する
    return env.ASSETS.fetch(request);
  }
};
