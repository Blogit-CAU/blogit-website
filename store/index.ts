import { CommitListPayload } from '@/api/github';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Commit {
  owner: string;
  repo: string;
  payload: CommitListPayload;
  diff: string;
}

interface CommitState {
  commits: Commit[];
  add: (newCommit: Commit) => void;
  remove: (commitId: string) => void;
  update: (commitId: string, updatedCommit: Commit) => void;
  clear: () => void;
}

export const useCommitStore = create<
  CommitState,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    commits: [],
    add: (newCommit) =>
      set((state) => ({ commits: [...state.commits, newCommit] })),
    remove: (commitId) =>
      set((state) => ({
        commits: state.commits.filter(
          (commit) => commit.payload.sha !== commitId,
        ),
      })),
    update: (commitId, updatedCommit) =>
      set((state) => ({
        commits: state.commits.map((commit) =>
          commit.payload.sha === commitId ? updatedCommit : commit,
        ),
      })),
    clear: () => set((state) => ({ commits: [] })),
  })),
);
