export class InvalidateBranchError extends Error {
  constructor() {
    super('Branch must have 3 digits ')
  }
}