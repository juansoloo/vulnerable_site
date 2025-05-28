import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const username = localStorage.getItem("username");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const fetchPosts = async () => {
    try {      const res = await axios.get("http://localhost:5050/api/posts");
      console.log("Fetched posts:", res.data); // Debugging
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
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

  const deletePost = async (postId) => {
    await axios.delete(`http://localhost:5050/api/posts/${postId}`);
    fetchPosts();
  };

  const addComment = async (postId, comment) => {
    if (!username) {
      alert("You must be signed in to comment.");
      return;
    }
    await axios.post(`http://localhost:5050/api/posts/${postId}/comments`, {
      author: username,
      content: comment,
    });
    fetchPosts();
  };

  const deleteComment = async (postId, commentId) => {
    await axios.delete(`http://localhost:5050/api/posts/${postId}/comments/${commentId}`);
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

      {posts.length === 0 ? (
        <p>No posts available. Create one!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid black", marginBottom: "1rem", padding: "0.5rem" }}>
            <h3>{post.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
            <small>By: {post.author}</small>
            {post.author === username && (
              <button onClick={() => deletePost(post._id)} style={{ marginLeft: "1rem", color: "red" }}>
                Delete Post
              </button>
            )}

            <h4>Comments</h4>
            {post.comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              post.comments.map((c) => (
                <p key={c._id}>
                  <b>{c.author}:</b> <span dangerouslySetInnerHTML={{ __html: c.content }} />
                  {c.author === username && (
                    <button
                      onClick={() => deleteComment(post._id, c._id)}
                      style={{ marginLeft: "1rem", color: "red" }}
                    >
                      Delete Comment
                    </button>
                  )}
                </p>
              ))
            )}

            <AddCommentForm postId={post._id} onComment={addComment} />
          </div>
        ))
      )}
    </div>
  );
}

function AddCommentForm({ postId, onComment }) {
  const [comment, setComment] = useState("");
  const username = localStorage.getItem("username");

  const submit = () => {
    if (!username) {
      alert("You must be signed in to comment.");
      return;
    }
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
        disabled={!username}
      />
      <button onClick={submit} disabled={!username}>Post</button>
      {!username && <div style={{ color: "red" }}>Sign in to comment</div>}
    </div>
  );
}
