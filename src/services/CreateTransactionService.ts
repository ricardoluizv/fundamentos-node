import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    let trans;

    if (type === 'income') trans = new Transaction({ title, value, type });
    else if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total <= 0 || value > balance.income) {
        throw Error('Funds insufficient for this transaction!');
      }

      if (balance.total - value < 0) {
        throw Error(
          `The value is biggest than income, try a value less or equal at ${balance.total}`,
        );
      }

      trans = new Transaction({ title, value, type: 'outcome' });
    } else throw Error('The transaction type is incorrect');

    if (trans === undefined) {
      throw Error('The balance data is incorrect');
    }

    this.transactionsRepository.create(trans);

    return trans;
  }
}

export default CreateTransactionService;
