export class CardAlreadyExistsError extends Error {
  constructor() {
    super('Physical card already exists in this account.')
  }
}
