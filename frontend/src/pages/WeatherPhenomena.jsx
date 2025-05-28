import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherPhenomena() {
    const username = localStorage.getItem("username");
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", imageUrl: "", link: "" });
    const [search, setSearch] = useState("");
    const [randomItem, setRandomItem] = useState(null);

    const fetchItems = async () => {
        const url = search
            ? `http://localhost:5050/api/weather?title=${encodeURIComponent(search)}&t=${Date.now()}`
            : "http://localhost:5050/api/weather";


        const res = await axios.get(url);
        setItems(res.data);

        // Pick a random item only when search is empty and no item selected yet
        if (!search && res.data.length > 0) {
            const idx = Math.floor(Math.random() * res.data.length);
            setRandomItem(res.data[idx]);
        } else {
            setRandomItem(null); // Reset random if search is used
        }
    };

    useEffect(() => { fetchItems(); }, [search]);

    const submit = async () => {
        if (!username) {
            alert("Sign in to submit.");
            return;
        }
        await axios.post("http://localhost:5050/api/weather", { ...form, author: username });
        setForm({ title: "", description: "", imageUrl: "", link: "" });
        setRandomItem(null); // Reset random item so a new one is picked after submit
        fetchItems();
    };

    // Filter items by search term (case-insensitive, matches title or description)
    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Weather Phenomena</h1>
            <input
                placeholder="Search phenomena..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: "1rem", width: "100%" }}
            />
            <h3>Submit New Phenomenon</h3>
            <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                disabled={!username}
            /><br />
            <textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                disabled={!username}
            /><br />
            <input
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                disabled={!username}
            /><br />
            <input
                placeholder="Link"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                disabled={!username}
            /><br />
            <button onClick={submit} disabled={!username}>Submit</button>
            <hr />

            {/* Show ONLY random phenomenon if no search, otherwise ONLY search results */}
            {search === "" ? (
                randomItem && (
                    <div style={{ border: "2px solid #0077cc", margin: "1rem 0", padding: "1rem", background: "#f0f8ff" }}>
                        <h2>Random Phenomenon</h2>
                        <h3>{randomItem.title}</h3>
                        <img src={randomItem.imageUrl} alt={randomItem.title} style={{ maxWidth: "300px" }} />
                        <p>{randomItem.description}</p>
                        <a href={randomItem.link} target="_blank" rel="noopener noreferrer">{randomItem.link}</a>
                        <div><small>By: {randomItem.author}</small></div>
                    </div>
                )
            ) : (
                filteredItems.length === 0 ? (
                    <p>No phenomena found.</p>
                ) : (
                    filteredItems.map(item => (
                        <div key={item._id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
                            <h3>{item.title}</h3>
                            <img src={item.imageUrl} alt={item.title} style={{ maxWidth: "300px" }} />
                            <p>{item.description}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                            <div><small>By: {item.author}</small></div>
                        </div>
                    ))
                )
            )}
        </div>
    );
}