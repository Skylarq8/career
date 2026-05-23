"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is required for ConvexProvider.");
  }

  const [client] = useState(() => new ConvexReactClient(convexUrl));

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
