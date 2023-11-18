export function validateDocument(document: string): boolean {
  document = document.replace(/\D/g, '')

  const isValidDocument = document.length === 14 || document.length === 11

  return isValidDocument
}