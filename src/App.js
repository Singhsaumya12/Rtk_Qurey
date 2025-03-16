import React, { useState } from "react";
import { useDeletePostMutation, useGetPostsQuery, useNewPostMutation, useUpdatePostMutation } from "./redux/api.js";
import PostCard from "./component/PostCard.js";

const App = () => {
  const { isLoading, isError, error, data, isSuccess, refetch } = useGetPostsQuery();
  
  const [newPost] = useNewPostMutation(); 
  const [updatePost] = useUpdatePostMutation(); 
  const [deletePost] = useDeletePostMutation();

  // Separate state for adding a post
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Separate state for editing a post
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const [selectedPost, setSelectedPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle adding a post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Title is required!");
      return;
    }

    const post = {
      title,
      body,
      userId: Math.floor(Math.random() * 1000),
      id: Math.floor(Math.random() * 1000).toString(),
    };

    try {
      await newPost(post).unwrap();
      setTitle("");
      setBody("");
      setErrorMessage("");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  // Handle clicking edit button
  const handleEditClick = (post) => {
    setSelectedPost(post);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  // Handle updating a post
  const handleUpdate = async () => {
    if (!selectedPost) return;

    if (!editTitle.trim()) {
      setErrorMessage("Title is required!");
      return;
    }

    const updatedPost = {
      id: selectedPost.id,
      title: editTitle,
      body: editBody,
      userId: selectedPost.userId,
    };

    try {
      await updatePost(updatedPost).unwrap();
      setSelectedPost(null);
      setErrorMessage("");
      refetch(); 
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  // Handle deleting a post
  const handleDelete = async (postId) => {
    try {
      await deletePost(postId).unwrap();
      console.log(`Post deleted successfully: ${postId}`);
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Add Post Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text"
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Body" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit">Add Post</button>  
        </div>
      </form>

      {/* Edit Post Form */}
      {selectedPost && (
        <div>
          <h2>Edit Post</h2>
          <input 
            type="text"
            placeholder="Title" 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Body" 
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Post</button>
          <button onClick={() => setSelectedPost(null)}>Cancel</button>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      {/* Display Posts */}
      {isSuccess && 
        data?.map((post) => (
          <div key={post.id}>
            <PostCard key={post.id} post={post} />
            <button onClick={() => handleEditClick(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default App;
