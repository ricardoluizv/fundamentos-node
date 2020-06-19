import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

// interface Balance {
//   income: number;
//   outcome: number;
//   total: number;
// }

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = new Balance();
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    if (transaction.type === 'income') {
      this.balance.income += transaction.value;
    } else {
      this.balance.outcome += transaction.value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;
    return transaction;
  }
}

export default TransactionsRepository;
