// Returns the last section of a URL split by '/'
export function getLastUrlSection(url: string): string {
  if (!url) return '';
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
}
// Capitalizes the first letter of a string
export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
