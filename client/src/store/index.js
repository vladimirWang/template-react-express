import { create } from 'zustand'

export const createPeopleStore = create(set => ({
  people: [],
  add: (newPeople) => set(state => ({ people: [...state.people, newPeople] }))
}))

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
