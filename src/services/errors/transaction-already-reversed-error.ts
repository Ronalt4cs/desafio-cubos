export class TransactionAlreadyReversedError extends Error {
  constructor() {
    super('Transaction already reversed.')
  }
}