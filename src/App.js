
import React, { useState } from "react";
import { useGetPostsQuery, useNewPostMutation } from "./redux/api.js";
import PostCard from "./component/PostCard.js";

const App = () => {
  const { isLoading, isError, error, data, isSuccess } = useGetPostsQuery();
  const [newPost] = useNewPostMutation(); //Removed (0)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const post = {
      title,
      body,
      userId: Math.floor(Math.random() * 1000),
      id: Math.floor(Math.random() * 1000),
    };

    try {
      await newPost(post).unwrap(); //Await mutation properly
      setTitle("");
      setBody("");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  console.log(isLoading, isError, error, data, isSuccess);

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Post</button>  {/*Fixed button text */}
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      {isSuccess && data?.map((post) => <PostCard key={post.id} post={post} />)}

      {/* {isLoading ? <div>Loading...</div> : data?.map((post) => <PostCard key={post.id} post={post} />)} */}
    </div>
  );
};

export default App;
