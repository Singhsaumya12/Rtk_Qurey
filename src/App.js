import React, { useState } from "react";
import { useGetPostsQuery, useNewPostMutation } from "./redux/api.js";
import PostCard from "./component/PostCard.js";

const App = () => {

  const { isLoading, isError, error, data, isSuccess } = useGetPostsQuery();
  const [newPost] = useNewPostMutation(0);
  const [title,setTitle] = useState("")
  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    // useGetPostsQuery.mutate({title, body})
    const post ={
      title,
      body,
      userId:Math.random().toString()*1000,
      userId:Math.random().toString()*1000,
    }
  }

  console.log(isLoading, isError, error, data, isSuccess);

   
  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
          <input type="text"
           placeholder="Title" 
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           />
           <input type="text"
           placeholder="Body" 
           value={body}
           onChange={(e) => setBody(e.target.value)}
           />
          <button type="submit">Search</button>
  
      </form>

      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      {isSuccess &&
        data?.map((i) => <PostCard key={i.id} post={i} />)}

      <p>ashubah</p> */}

      {isLoading ? (
        <div>Loading...</div>
      ):(
        data?.map((i) => <PostCard key={i.id} post={i} />))}
    </div>
  );
};

export default App;
