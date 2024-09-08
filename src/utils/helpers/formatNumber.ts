/**
 * Форматирует число в более читаемый вид.
 * @param {number} value - Число для форматирования.
 * @returns {string} Отформатированное число с суффиксами K, M или B.
 */
export const formatNumber = (value: number): string => {
  const suffixes = [
    { threshold: 1_000_000_000, suffix: 'B' },
    { threshold: 1_000_000, suffix: 'M' },
    { threshold: 1_000, suffix: 'K' },
  ];

  for (const { threshold, suffix } of suffixes) {
    if (value >= threshold) {
      return (value / threshold).toFixed(1).replace(/\.0$/, '') + suffix;
    }
  }

  return value.toString();
};
