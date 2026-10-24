import { readFile, writeFile } from 'node:fs/promises';

const target = new URL('../src/data/github-metadata.ts', import.meta.url);
const repositories = {
  'psm-e-learning': 'Fagacie/psm-elms',
  'iot-monitoring': 'Fagacie/IoT-Environmental-Monitor',
  'pku-management': 'Fagacie/pkumanagementsystem',
  'masakjerr': 'Fagacie/masakjerr-project1',
  'elite-soccer': 'Fagacie/ESFhomepage'
};

let previous = {};
try {
  const current = await readFile(target, 'utf8');
  const match = current.match(/export const githubMetadata[^=]*=\s*({[\s\S]*});?\s*$/);
  if (match) previous = JSON.parse(match[1].replace(/;\s*$/, ''));
} catch {
  // A missing metadata file is not a build blocker.
}

const next = { ...previous };
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'usyy-portfolio-build'
};

if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

for (const [key, fullName] of Object.entries(repositories)) {
  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers,
      signal: AbortSignal.timeout(4500)
    });
    if (!response.ok) {
      console.warn(`GitHub metadata skipped for ${fullName}: HTTP ${response.status}`);
      continue;
    }
    const repo = await response.json();
    next[key] = {
      stars: Number(repo.stargazers_count) || 0,
      forks: Number(repo.forks_count) || 0,
      updatedAt: String(repo.updated_at || ''),
      url: String(repo.html_url || `https://github.com/${fullName}`)
    };
  } catch (error) {
    console.warn(`GitHub metadata unavailable for ${fullName}; keeping cached values.`);
  }
}

const output = `export type GitHubRepositoryMetadata = {
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
};

export const githubMetadata: Record<string, GitHubRepositoryMetadata> = ${JSON.stringify(next, null, 2)};
`;
await writeFile(target, output, 'utf8');
console.log('GitHub repository metadata synchronized with cached fallbacks.');
