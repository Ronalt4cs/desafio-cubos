export function validateCardNumber(number: string) {
  const isNumberValid = number.replace(/\D/g, '').length === 16

  return isNumberValid
}