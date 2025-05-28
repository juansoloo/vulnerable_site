import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherPhenomena() {
  const username = localStorage.getItem("username");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", link: "" });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [randomItem, setRandomItem] = useState(null);

  // Fetch items for search or initial load
  const fetchItems = async (query = "") => {
    const url = query
      ? `http://localhost:5050/api/weather?title=${encodeURIComponent(query)}`
      : "http://localhost:5050/api/weather";
    try {
      const res = await axios.get(url);
      setItems(res.data);
      if (!query && res.data.length > 0) {
        const idx = Math.floor(Math.random() * res.data.length);
        setRandomItem(res.data[idx]);
      } else {
        setRandomItem(null);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
      setRandomItem(null);
    }
  };

  // Only fetch on mount and when searching
  useEffect(() => {
    fetchItems(search);
    // eslint-disable-next-line
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(searchInput);
    }
  };

  const handleSubmit = async () => {
    if (!username) {
      alert("Sign in to submit.");
      return;
    }
    try {
      await axios.post("http://localhost:5050/api/weather", { ...form, author: username });
      setForm({ title: "", description: "", imageUrl: "", link: "" });
      // Directly fetch and set items/randomItem after submit
      const res = await axios.get("http://localhost:5050/api/weather");
      setItems(res.data);
      if (res.data.length > 0) {
        const idx = Math.floor(Math.random() * res.data.length);
        setRandomItem(res.data[idx]);
      } else {
        setRandomItem(null);
      }
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  return (
    <div>
      <h1>Weather Phenomena</h1>
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search phenomena..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit">Search</button>
      </form>
      {/* Submit Form */}
      <h3>Submit New Phenomenon</h3>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        disabled={!username}
      /><br />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        disabled={!username}
      /><br />
      <input
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        disabled={!username}
      /><br />
      <input
        placeholder="Link"
        value={form.link}
        onChange={(e) => setForm({ ...form, link: e.target.value })}
        disabled={!username}
      /><br />
      <button onClick={handleSubmit} disabled={!username}>Submit</button>
      <hr />
      {/* Display Results */}
      {search === "" ? (
        randomItem && (
          <div style={{ border: "2px solid #0077cc", padding: "1rem", background: "#f0f8ff", marginBottom: "1rem" }}>
            <h2>Random Phenomenon</h2>
            <h3>{randomItem.title}</h3>
            <img src={randomItem.imageUrl} alt={randomItem.title} style={{ maxWidth: "300px" }} />
            <p>{randomItem.description}</p>
            <a href={randomItem.link} target="_blank" rel="noopener noreferrer">{randomItem.link}</a>
            <div><small>By: {randomItem.author}</small></div>
          </div>
        )
      ) : items.length === 0 ? (
        <p>No phenomena found.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{item.title}</h3>
            <img src={item.imageUrl} alt={item.title} style={{ maxWidth: "300px" }} />
            <p>{item.description}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
            <div><small>By: {item.author}</small></div>
          </div>
        ))
      )}
    </div>
  );
}
