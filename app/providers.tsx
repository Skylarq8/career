"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

const fallbackConvexUrl = "https://brave-chickadee-230.eu-west-1.convex.cloud";
const oldUndeployedConvexUrl = "robust-puffin-848.eu-west-1.convex.cloud";

export function Providers({ children }: { children: React.ReactNode }) {
  const configuredConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convexUrl =
    configuredConvexUrl && !configuredConvexUrl.includes(oldUndeployedConvexUrl)
      ? configuredConvexUrl
      : fallbackConvexUrl;

  const [client] = useState(() => new ConvexReactClient(convexUrl));

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
