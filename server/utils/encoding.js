const encode = (rawInput) => {
  const buffer = Buffer.from(rawInput, "UTF8");
  return buffer.toString("base64");
};

const decode = (encodedInput) => {
  const buffer = Buffer.from(encodedInput, "base64");
  return buffer.toString("UTF8");
};

export default { encode, decode };
