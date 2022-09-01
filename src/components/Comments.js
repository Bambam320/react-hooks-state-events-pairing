import { useState } from "react"

function Comments({ data, setData, handleDelete }) {
  const [isClicked, setIsClicked] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const sortOptions = [
    {value: '', text: 'Select'},
    {value: 'User A-Z', text: 'User A-Z'},
    {value: 'Comment A-Z', text: 'Comment A-Z'},
    {value: 'Most upvotes', text: 'Most Upvotes'},
    {value: 'Most downvotes', text: 'Most Downvotes'}
  ]

  const [sortBy, setSortBy] = useState(sortOptions[0].value)

  function handleClick(event) {
    const name = event.target.name
    const value = parseInt(event.target.value) + 1
    const id = parseInt(event.target.id)
    const newComments = data.comments.map((comment) => comment.id === id ? {...comment, [name]: value} : comment)
    setData({...data, comments: newComments})
  }

  const comments = data.comments
  .filter((comment) => comment.user.includes(searchTerm) || comment.comment.includes(searchTerm))
  .sort((a,b) => {
    switch (sortBy) {
      case 'Most upvotes' : return b.upvotes - a.upvotes
      break;
      case 'Most downvotes' : return b.downvotes - a.downvotes
      break;
      case 'User A-Z' : return a.user.toLowerCase() > b.user.toLowerCase() ? 1 : -1
      break;
      case 'Comment A-Z' : return a.comment.toLowerCase() > b.comment.toLowerCase() ? 1 : -1
      break;
      case '' : return a.id - b.id
      break;
      default: console.log('nothing to sort')
    }
  })
  .map((comment) => {
    return (
      <>
        <strong key={comment.id}>{comment.user}</strong>
        <p>{comment.comment}</p>
        <button 
          onClick={handleClick} 
          name='upvotes' 
          value={comment.upvotes}
          id={comment.id}
        >{comment.upvotes} 👍</button>
        <button 
          onClick={handleClick} 
          name='downvotes' 
          value={comment.downvotes}
          id={comment.id}
        >{comment.downvotes} 👎</button>
        <p></p>
        <button
          onClick={handleDelete}
          name='delete'
          value={comment.id}
        >Delete This Comment</button>
        <p></p>
      </>
    )
  })

  function handleCommentClick() {
    setIsClicked(!isClicked)
  }

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleSortChange(e) {
    setSortBy(e.target.value)
  }

  function hidden () {
    return (
      <>
        <label> Search For Comments!
          <br></br>
          {<input type='text' placeholder='search for comments...' onChange={handleChange} value={searchTerm}></input>}
        </label>
        <br></br>
        <p></p>
        <label> Sort Comments By
          <br></br>
          <select value={sortBy} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option 
                key={option.value} 
                value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </label>
        <h2>{data.comments.length} Comments</h2>
        {comments}
      </>
    )
  }

  return (
    <div>
      <button onClick={handleCommentClick}>{isClicked ? 'Show Comments' : 'Hide Comments'}</button>
      <hr />
      {isClicked ? <p></p> : hidden()}
    </div>
    
  )
}

export default Comments;