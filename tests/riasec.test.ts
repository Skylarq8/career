import { describe, expect, it } from "vitest";
import {
  calculateRiasecResult,
  riasecCategoryOrder,
  riasecQuestions,
} from "@/lib/riasec";
import type { RiasecAnswers, RiasecCategory } from "@/lib/riasec";

describe("RIASEC scoring", () => {
  it("sums each category and creates a Holland Code from the top three", () => {
    const result = calculateRiasecResult(
      answersByCategory({
        A: 4,
        C: 1,
        E: 3,
        I: 2,
        R: 1,
        S: 5,
      }),
    );

    expect(result.scores.S).toBe(30);
    expect(result.scores.A).toBe(24);
    expect(result.scores.E).toBe(18);
    expect(result.topCategories.map((item) => item.category)).toEqual(["S", "A", "E"]);
    expect(result.hollandCode).toBe("SAE");
  });

  it("keeps R, I, A, S, E, C order when category scores tie", () => {
    const result = calculateRiasecResult(answersByCategory(allCategories(3)));

    expect(result.hollandCode).toBe("RIA");
    expect(result.hasTie).toBe(true);
  });

  it("sorts top three by score before stable order", () => {
    const result = calculateRiasecResult(
      answersByCategory({
        A: 5,
        C: 2,
        E: 4,
        I: 4,
        R: 1,
        S: 3,
      }),
    );

    expect(result.topCategories.map((item) => item.category)).toEqual(["A", "I", "E"]);
  });

  it("rejects empty and incomplete answer sets", () => {
    expect(() => calculateRiasecResult({})).toThrow("36");
    expect(() =>
      calculateRiasecResult({
        [riasecQuestions[0].id]: 5,
      }),
    ).toThrow("36");
  });

  it("rejects answers outside the 1-5 scale", () => {
    const invalid = answersByCategory(allCategories(3));
    invalid[riasecQuestions[0].id] = 6;

    expect(() => calculateRiasecResult(invalid)).toThrow("1-5");
  });
});

function answersByCategory(values: Record<RiasecCategory, number>): RiasecAnswers {
  return Object.fromEntries(
    riasecQuestions.map((question) => [question.id, values[question.category]]),
  );
}

function allCategories(value: number) {
  return Object.fromEntries(
    riasecCategoryOrder.map((category) => [category, value]),
  ) as Record<RiasecCategory, number>;
}
