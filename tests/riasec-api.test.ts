import { describe, expect, it } from "vitest";
import { api } from "@/lib/api/app";
import { riasecQuestions } from "@/lib/riasec";

describe("RIASEC API validation", () => {
  it("rejects invalid answer sets before touching persistence", async () => {
    const response = await api.request("/api/tests/riasec/submit", {
      body: JSON.stringify({
        answers: {
          "r-1": 7,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    expect(response.status).toBe(400);
  });

  it("returns an anonymous backend calculation without saving", async () => {
    const response = await api.request("/api/tests/riasec/submit", {
      body: JSON.stringify({
        answers: Object.fromEntries(riasecQuestions.map((question) => [question.id, 3])),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const payload = (await response.json()) as {
      result: { hollandCode: string };
      saved: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.saved).toBe(false);
    expect(payload.result.hollandCode).toBe("RIA");
  });
});
