const sanitizeInput = require("./sanitization");

describe("Sanitization", () => {
  test("Should sanitize input by escaping HTML tags and not equaly the original input", () => {
    // Arrange
    const input = '<a href="https://example.com">HTML</a>';
    const expectedOutput = "<a href='https://example.com'>HTML</a>";
    // ACT
    const sanitizedInput = sanitizeInput(input);
    // ASSERT
    expect(sanitizedInput).not.toEqual(expectedOutput);
  });

  test("Should sanitize input with malicious script tags", () => {
    // Arrange
    const input = '<script>alert("This is a malicious script");</script>';
    const expectedOutput = "";
    // ACT
    const sanitizedInput = sanitizeInput(input);
    // ASSERT
    expect(sanitizedInput).toEqual(expectedOutput);
  });
});
