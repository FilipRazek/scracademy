export default () => {
  const logLevel = parseInt(process.env.LOG_LEVEL, 10);
  if (isNaN(logLevel)) {
    throw new Error("LOG_LEVEL is not a number");
  }
  return logLevel;
};
