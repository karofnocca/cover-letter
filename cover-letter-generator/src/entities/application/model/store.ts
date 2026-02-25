import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CoverLetter } from './types';

interface ApplicationStore {
  current: CoverLetter[];
  archive: CoverLetter[];
  addApplication: (app: CoverLetter) => void;
  deleteApplication: (id: string, type: 'current' | 'archive') => void;
  archiveCurrentCycle: () => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      current: [],
      archive: [],

      addApplication: (app) =>
        set((state) => ({
          current: [app, ...state.current],
        })),

      deleteApplication: (id, type) =>
        set((state) => ({
          [type]: state[type].filter((app) => app.id !== id),
        })),

      archiveCurrentCycle: () =>
        set((state) => ({
          archive: [...state.current, ...state.archive],
          current: [],
        })),
    }),
    { name: 'cover-letters-storage' }
  )
);
