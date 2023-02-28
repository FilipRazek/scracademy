export default (url: string) => {
  const regex = /\/dp\/([A-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
};
