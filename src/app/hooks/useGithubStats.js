"use client";
import { useEffect, useState } from "react";
import { careerStart, fallbackStats } from "../../../assets/assets";

const monthsSince = (iso) => {
  const s = new Date(iso);
  const n = new Date();
  return (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth()) + 1;
};

// Live numbers from /api/github-stats; each key falls back to the resume figure
// until (or unless) the API returns it. `live` says which keys are real.
export default function useGithubStats() {
  const [state, setState] = useState({
    values: { ...fallbackStats, months: monthsSince(careerStart) },
    live: {},
    loaded: false, // true once the fetch settles (either way)
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-stats")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const live = Object.fromEntries(Object.entries(d?.live ?? {}).filter(([, v]) => v != null));
        setState({
          values: { ...fallbackStats, ...live, months: d?.months ?? monthsSince(careerStart) },
          live: Object.fromEntries(Object.keys(live).map((k) => [k, true])),
          loaded: true,
        });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loaded: true }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
