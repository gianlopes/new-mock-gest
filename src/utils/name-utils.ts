export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
};

export const strToUpperAndClean = (str: string) =>
  removeAccents(str).toUpperCase();
