import { serve } from "@hono/node-server";
import { api } from "../lib/api/app";

const port = Number(process.env.PORT ?? 8787);

serve({
  fetch: api.fetch,
  port,
});

console.log(`Миний Чиглэл API http://localhost:${port}`);
