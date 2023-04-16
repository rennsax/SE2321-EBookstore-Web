export default async (delay: number) => {
  const value = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
  return value;
};
