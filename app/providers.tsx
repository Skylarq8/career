"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

const fallbackConvexUrl = "https://brave-chickadee-230.eu-west-1.convex.cloud";

export function Providers({ children }: { children: React.ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || fallbackConvexUrl;

  const [client] = useState(() => new ConvexReactClient(convexUrl));

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
