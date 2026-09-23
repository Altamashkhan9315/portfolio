import { NextResponse } from "next/server";
import { careerStart, fallbackStats } from "../../../../assets/assets";

// Needs GITHUB_TOKEN in .env.local (and in the host's env vars).
// Optional: GITHUB_REPOS="owner/repo,owner/repo2", GITHUB_LOGIN="username", LEETCODE_USER="username"
const REPOS = (process.env.GITHUB_REPOS || "mulltiplyinc/mulltiply-chatbot").split(",").map((s) => s.trim());
const LOGIN = (process.env.GITHUB_LOGIN || "Altamashkhan9315").toLowerCase();
const BRANCH = process.env.GITHUB_BRANCH || "production"; // branch the commit tile counts
const LEETCODE_USER = process.env.LEETCODE_USER || "altamashkhan9315";
const REVALIDATE = 3600; // seconds; new commits show up within an hour of landing on the default branch

const monthsSince = (iso) => {
  const s = new Date(iso);
  const n = new Date();
  return (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth()) + 1;
};

const gh = (path, token) =>
  fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: REVALIDATE },
  });

const isMe = (login) => login?.toLowerCase() === LOGIN;

const graphql = async (query, variables, token) => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`graphql: ${res.status}`);
  const d = await res.json();
  if (d.errors) throw new Error(d.errors[0]?.message);
  return d.data;
};

// commit counts for everyone on the default branch (includes merges)
async function contributors(repo, token) {
  const res = await gh(`/repos/${repo}/contributors?per_page=100`, token);
  if (!res.ok) throw new Error(`${repo} contributors: ${res.status}`);
  const list = await res.json();
  const mine = list.filter((c) => isMe(c.login)).reduce((s, c) => s + (c.contributions || 0), 0);
  const total = list.reduce((s, c) => s + (c.contributions || 0), 0);
  return { mine, total };
}

// commit counts on a specific branch (includes merges); falls back to the default branch if it doesn't exist
async function branchCommits(repo, token) {
  const [owner, name] = repo.split("/");
  const { user } = await graphql(`query($login:String!){ user(login:$login){ id } }`, { login: LOGIN }, token);
  const { repository } = await graphql(
    `query($owner:String!,$name:String!,$ref:String!,$author:ID!){
      repository(owner:$owner,name:$name){
        ref(qualifiedName:$ref){ target{ ... on Commit {
          all: history{ totalCount }
          mine: history(author:{id:$author}){ totalCount }
        } } }
      }
    }`,
    { owner, name, ref: `refs/heads/${BRANCH}`, author: user.id },
    token
  );
  const t = repository?.ref?.target;
  if (!t) return contributors(repo, token);
  return { mine: t.mine.totalCount, total: t.all.totalCount };
}

// weekly additions/deletions per author on the default branch (excludes merges).
// GitHub returns 202 while it computes these, so retry a couple of times.
async function codeStats(repo, token) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await gh(`/repos/${repo}/stats/contributors`, token);
    if (res.status === 202) {
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }
    if (!res.ok) throw new Error(`${repo} stats: ${res.status}`);
    const list = await res.json();
    const me = list.find((c) => isMe(c.author?.login));
    if (!me) return { additions: 0, deletions: 0, activeWeeks: 0, totalWeeks: 0 };
    const weeks = me.weeks || [];
    const firstActive = weeks.findIndex((w) => w.c > 0);
    const since = firstActive === -1 ? [] : weeks.slice(firstActive);
    return {
      additions: weeks.reduce((s, w) => s + w.a, 0),
      deletions: weeks.reduce((s, w) => s + w.d, 0),
      activeWeeks: since.filter((w) => w.c > 0).length,
      totalWeeks: since.length,
    };
  }
  throw new Error(`${repo} stats still computing`);
}

// solved-problem count from LeetCode's public GraphQL (unofficial; fails soft)
async function leetcode() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({
      query: "query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}}}}",
      variables: { u: LEETCODE_USER },
    }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`leetcode: ${res.status}`);
  const d = await res.json();
  const all = d?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((x) => x.difficulty === "All");
  return all?.count ?? null;
}

export async function GET() {
  const months = monthsSince(careerStart);
  const token = process.env.GITHUB_TOKEN;
  const out = { months, source: "fallback", live: {} };

  if (token) {
    const [contrib, code] = await Promise.allSettled([
      Promise.all(REPOS.map((r) => branchCommits(r, token))),
      Promise.all(REPOS.map((r) => codeStats(r, token))),
    ]);

    if (contrib.status === "fulfilled") {
      const mine = contrib.value.reduce((s, c) => s + c.mine, 0);
      const total = contrib.value.reduce((s, c) => s + c.total, 0);
      out.live.commits = mine;
      out.live.sharePct = total ? Math.round((mine / total) * 100) : null;
      out.live.branch = BRANCH;
      out.source = "github";
    } else {
      out.error = contrib.reason?.message;
    }

    if (code.status === "fulfilled") {
      const sum = (k) => code.value.reduce((s, c) => s + c[k], 0);
      out.live.linesAdded = sum("additions");
      out.live.linesDeleted = sum("deletions");
      // weeks are per-repo; report the widest span
      out.live.activeWeeks = Math.max(...code.value.map((c) => c.activeWeeks));
      out.live.totalWeeks = Math.max(...code.value.map((c) => c.totalWeeks));
    }
  }

  try {
    const solved = await leetcode();
    if (solved != null) out.live.leetcode = solved;
  } catch {}

  out.fallback = fallbackStats;
  out.updatedAt = new Date().toISOString();
  return NextResponse.json(out, {
    headers: { "Cache-Control": `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` },
  });
}
