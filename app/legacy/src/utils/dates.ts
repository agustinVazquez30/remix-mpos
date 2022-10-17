export const getUTCNow = (): Date => {
  const nowLocal = new Date();
  return new Date(
    nowLocal.getUTCFullYear(),
    nowLocal.getUTCMonth(),
    nowLocal.getUTCDate(),
    nowLocal.getUTCHours(),
    nowLocal.getUTCMinutes(),
    nowLocal.getUTCSeconds(),
  );
};
