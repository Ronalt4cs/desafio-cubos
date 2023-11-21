export class BalanceInsufficientError extends Error {
  constructor() {
    super('Balance is insufficient.')
  }
}