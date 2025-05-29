import { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5050/api/auth/dashboard", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
        if (res.status === 401) {
          setUsername(null);
        } else {
          return res.text();
        }
      })
      .then((text) => {
        const match = text?.match(/Welcome,\s*(.*?)<\/h1>/);
        if (match) {
          setUsername(match[1]);
        }
        setLoading(false);
      })
      .catch(() => {
        setUsername(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {username ? (
        <p>You are logged in as <strong>{username}</strong></p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
}
