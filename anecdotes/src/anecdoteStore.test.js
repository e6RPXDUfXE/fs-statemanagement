import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdoteActions } from './anecdoteStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
  it('voting increases the number of votes for an anecdote', async () => {
    const anecdote = { id: 1, content: 'Testing voting', votes: 2 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })

    const updatedAnecdote = { ...anecdote, votes: 3 }
    anecdoteService.update.mockResolvedValue(updatedAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(anecdote.id)
    })

    expect(anecdoteService.update).toHaveBeenCalledWith(1, updatedAnecdote)

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(3)
  })
  it('setFilter updates filter', () => {
    const { result: actionsResult } = renderHook(() => useAnecdoteActions())
    const { result: filterResult } = renderHook(() => useFilter())

    act(() => {
      actionsResult.current.setFilter('important')
    })

    expect(filterResult.current).toBe('important')
  })
})

describe('useAnecdotes', () => {
  it('returns anecdotes sorted by votes in descending order', () => {
    const anecdotes = [
      { id: 1, content: 'First', votes: 1 },
      { id: 2, content: 'Second', votes: 3 },
      { id: 3, content: 'Third', votes: 2 },
    ]
    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())
    expect(result.current.map(anecdote => anecdote.id)).toEqual([2, 3, 1])
  })
  it('returns only anecdotes matching the filter in descending order by votes', () => {
    const anecdotes = [
      { id: 1, content: 'If it hurts, do it more often', votes: 1 },
      { id: 2, content: 'Filter Test', votes: 2 },
      { id: 3, content: 'Testing the Anecdote Store', votes: 3 },
    ]

    useAnecdoteStore.setState({ anecdotes, filter: 'test' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toEqual([
      { id: 3, content: 'Testing the Anecdote Store', votes: 3 },
      { id: 2, content: 'Filter Test', votes: 2 },
    ])
  })
})
