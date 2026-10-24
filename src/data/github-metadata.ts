export type GitHubRepositoryMetadata = {
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
};

export const githubMetadata: Record<string, GitHubRepositoryMetadata> = {};
