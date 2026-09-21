import { useAnecdotes, useAnecdoteActions } from "../anecdoteStore"
import { useNotificationActions } from "../notificationStore"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = (id, content) => {
    vote(id)
    setNotification(`you voted '${content}'`)
  }

  const handleDelete = (id, content) => {
    remove(id)
    setNotification(`you deleted '${content}'`)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => handleDelete(anecdote.id, anecdote.content)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
