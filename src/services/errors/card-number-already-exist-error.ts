export class CardNumberAlreadyExistsError extends Error {
  constructor() {
    super('Card number already exists.')
  }
}
