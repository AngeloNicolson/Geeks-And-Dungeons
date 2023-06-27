const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const sanitizeInput = (input) => {
  const sanitizedInput = DOMPurify.sanitize(input);
  return sanitizedInput;
};

module.exports = sanitizeInput;
