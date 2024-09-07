/**
 * Форматирует дату в строку в формате локали.
 * @param {Date | string | number} date - Дата, которую нужно отформатировать. Может быть объектом Date, строкой или числом.
 * @returns {string} Отформатированная дата.
 */

export const formatDate = (date: Date | string | number): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString();
};
