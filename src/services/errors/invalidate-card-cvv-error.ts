export class InvalidateCardCvvError extends Error {
  constructor() {
    super('Card cvv must have 3 digits.')
  }
}
