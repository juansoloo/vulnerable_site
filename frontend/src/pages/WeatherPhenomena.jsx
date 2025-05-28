import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherPhenomena() {
    const username = localStorage.getItem("username");
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", imageUrl: "", link: "" });
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState(""); // This triggers the search
    const [randomItem, setRandomItem] = useState(null);

    const fetchItems = async (query = "") => {
        const url = query
            ? `http://localhost:5050/api/weather?title=${encodeURIComponent(query)}`
            : "http://localhost:5050/api/weather";

        const res = await axios.get(url);
        setItems(res.data);

        if (!query && res.data.length > 0) {
            const idx = Math.floor(Math.random() * res.data.length);
            setRandomItem(res.data[idx]);
        } else {
            setRandomItem(null);
        }
    };

    useEffect(() => { fetchItems(search); }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchInput);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearch(searchInput);
        }
    };

    const submit = async () => {
        if (!username) {
            alert("Sign in to submit.");
            return;
        }
        await axios.post("http://localhost:5050/api/weather", { ...form, author: username });
        setForm({ title: "", description: "", imageUrl: "", link: "" });
        setRandomItem(null);
        fetchItems("");
        setSearchInput("");
        setSearch("");
    };

    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Weather Phenomena</h1>
            <form onSubmit={handleSearch}>
                <input
                    placeholder="Search phenomena..."
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    style={{ marginBottom: "1rem", width: "100%" }}
                />
                <button type="submit">Search</button>
            </form>
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