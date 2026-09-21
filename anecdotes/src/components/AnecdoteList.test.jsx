import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnecdoteList from './AnecdoteList'
import useAnecdoteStore from '../anecdoteStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

describe('AnecdoteList', () => {
  it('displays anecdotes in descending order by votes', () => {
    const anecdotes = [
      { id: 1, content: 'First', votes: 1 },
      { id: 2, content: 'Second', votes: 3 },
      { id: 3, content: 'Third', votes: 2 },
    ]
    useAnecdoteStore.setState({ anecdotes })
    const { container } = render(<AnecdoteList />)

    const content = container.textContent
    expect(content. indexOf('Second')).toBeLessThan(content.indexOf('Third'))
    expect(content.indexOf('Third')).toBeLessThan(content.indexOf('First'))
  })
  it('displays filtered anecdotes in descending order by votes', () => {
    const anecdotes = [
      { id: 1, content: 'If it hurts, do it more often', votes: 1 },
      { id: 2, content: 'Filter Test', votes: 2 },
      { id: 3, content: 'Testing the Anecdote Store', votes: 3 },
    ]
    useAnecdoteStore.setState({ anecdotes, filter: 'test' })
    const { container } = render(<AnecdoteList />)

    const content = container.textContent
    expect(content. indexOf('Testing the Anecdote Store')).toBeLessThan(content.indexOf('Filter Test'))
    expect(screen.queryByText('If it hurts, do it more often')).not.toBeInTheDocument()
  })
})