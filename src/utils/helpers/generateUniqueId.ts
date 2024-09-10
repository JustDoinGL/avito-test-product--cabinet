/**
 * Генерирует уникальный идентификатор на основе текущего времени.
 * @returns {string} Уникальный идентификатор.
 */

export const generateUniqueId = (): string => `${Date.now()}`;

// Конечно не лучшее рещение но обычно id выдают на бэке еще посмотрел что json server сам может генерировать id но что-то у меня не получилось

/* 
Notable differences with v0.17
id is always a string and will be generated for you if missing
*/
