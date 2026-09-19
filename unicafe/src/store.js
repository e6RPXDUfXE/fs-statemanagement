import { create } from 'zustand'
import { useShallow } from "zustand/react/shallow"

const useStatisticsStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    addGood: () => set(
      state => ({ good: state.good + 1 })
    ),
    addNeutral: () => set(
      state => ({ neutral: state.neutral + 1 })
    ),
    addBad: () => set(
      state => ({ bad: state.bad + 1 })
    )
  }
}))

export const useValues = () => useStatisticsStore(
  useShallow((state) => ({
    good: state.good,
    neutral: state.neutral,
    bad: state.bad,
  })),
)

export const useStatisticsActions = () => useStatisticsStore((state) => state.actions)
