import React, {useState} from "react"
import Comments from "./Comments.js"
import video from "../data/video.js";

function App() {
  const [data, setData] = useState(video)

  function handleVote(event) {
    const name = event.target.name
    const value = parseInt(event.target.value) + 1
    setData({...data, [name]:value})
  }

  function handleDelete(e) {
    const newList = data.comments.filter((comment) => comment.id !== parseInt(e.target.value))
    setData({...data, comments:  newList})
  }

  return (
    <div className="App">
      <iframe
        width="919"
        height="525"
        src={data.embedUrl}
        frameBorder="0"
        allowFullScreen
        title="Thinking in React"
      />
      <h1>{data.title}</h1>
      <p>{data.views} Views | Uploaded {data.createdAt}</p>
      <button 
        onClick={handleVote} 
        name='upvotes'
        value={data.upvotes}
      >{data.upvotes}👍</button>
      <button 
        onClick={handleVote}
        name='downvotes' 
        value={data.downvotes}
      >{data.downvotes}👎</button>
      <p></p>
      <Comments data={data} setData={setData} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
