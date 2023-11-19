export class InvalidateAccountNumberError extends Error {
  constructor() {
    super('Account number must have 8 digits')
  }
}