export class PhysicalCardAlreadyExistsError extends Error {
  constructor() {
    super('Physical card already exists in this account.')
  }
}
