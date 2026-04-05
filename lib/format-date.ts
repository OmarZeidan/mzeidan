export function formatDateArabic(dateString: string): string {
  // Date-only strings (YYYY-MM-DD) are parsed as UTC midnight by the JS engine,
  // which shifts the displayed day in UTC+ timezones. Parsing the parts directly
  // creates a local-time date and avoids the off-by-one issue.
  const [year, month, day] = dateString.slice(0, 10).split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
