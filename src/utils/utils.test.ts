import { formatSelectFields } from ".";

describe("util functions", () => {
  it("can select & format fields based on boolean flag", () => {
    expect(formatSelectFields({ result_info: true, starting_at: true })).toBe(
      "result_info,starting_at",
    );
    expect(formatSelectFields({ result_info: false, starting_at: true })).toBe(
      "starting_at",
    );
  });
  it("will return an emprty string of field flags are false", () => {
    expect(formatSelectFields({ result_info: false, starting_at: false })).toBe(
      "",
    );
  });
});
