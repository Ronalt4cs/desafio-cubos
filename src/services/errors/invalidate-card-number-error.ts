export class InvalidateCardNumberError extends Error {
  constructor() {
    super('Card number must have 16 digits.')
  }
}
