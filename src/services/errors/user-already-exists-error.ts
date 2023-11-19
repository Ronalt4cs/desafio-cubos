export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Document already exists.')
  }
}
