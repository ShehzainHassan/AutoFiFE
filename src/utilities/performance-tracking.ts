import { captureMessage } from "@sentry/nextjs";
import type { ProfilerOnRenderCallback } from "react";
export const trackRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  const message = `[Profiler] ${id} ${phase} took ${actualDuration.toFixed(
    2
  )}ms`;

  if (actualDuration > 100) {
    captureMessage(message, {
      level: "warning",
      tags: {
        component: id,
        phase,
      },
      extra: {
        duration: actualDuration,
        baseDuration,
        startTime,
        commitTime,
      },
    });
  }
};
