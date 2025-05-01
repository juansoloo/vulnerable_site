import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const username = localStorage.getItem("username");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5050/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    await axios.post("http://localhost:5050/api/posts", {
      ...newPost,
      author: username,
    });
    setNewPost({ title: "", body: "" });
    fetchPosts();
  };

  const addComment = async (postId, comment) => {
    await axios.post(`http://localhost:5050/api/posts/${postId}/comments`, {
      author: username,
      content: comment,
    });
    fetchPosts();
  };

  return (
    <div>
      <h1>📝 Blog</h1>
      <h3>Create New Post</h3>
      <input
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <br />
      <textarea
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <br />
      <button onClick={createPost}>Submit Post</button>

      <hr />

      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid black", marginBottom: "1rem", padding: "0.5rem" }}>
          <h3>{post.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
          <small>By: {post.author}</small>

          <h4>Comments</h4>
          {post.comments.map((c, i) => (
            <p key={i}><b>{c.author}:</b> <span dangerouslySetInnerHTML={{ __html: c.content }} /></p>
          ))}

          <AddCommentForm postId={post._id} onComment={addComment} />
        </div>
      ))}
    </div>
  );
}

function AddCommentForm({ postId, onComment }) {
  const [comment, setComment] = useState("");

  const submit = () => {
    if (comment.trim()) {
      onComment(postId, comment);
      setComment("");
    }
  };

  return (
    <div>
      <input
        placeholder="Add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submit}>Post</button>
    </div>
  );
}
