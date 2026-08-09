import { useState, useEffect } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("一般会員");

  const fetchMembers = async () => {
    const res = await fetch("/api/get-members");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("名前を入力してください");

    const res = await fetch("/api/add-member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
    });

    if (res.ok) {
      setName("");
      fetchMembers();
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Cloudflare 自動公開テストサイト</h2>
      <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <input type="text" placeholder="お名前" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "8px", marginRight: "10px" }} />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: "8px", marginRight: "10px" }}>
          <option value="一般会員">一般会員</option>
          <option value="管理者">管理者</option>
        </select>
        <button type="submit" style={{ padding: "8px 15px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px" }}>追加</button>
      </form>
      <h4>会員一覧</h4>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead><tr style={{ background: "#eee" }}><th>ID</th><th>名前</th><th>役職</th></tr></thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}><td>{m.id}</td><td>{m.name}</td><td>{m.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
