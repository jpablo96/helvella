const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
] as const

export function formatGalleryDate(date: string, format: 'short' | 'long' = 'short'): string {
  const [year, month] = date.split('-')

  if (format === 'long') {
    return `${MONTHS[parseInt(month, 10) - 1]} ${year}`
  }

  return date.split('-').reverse().join('/')
}
