import { LoadTransactionList, TransactionActions } from '../actions/transaction.actions';
import { Transaction } from '../models/transaction';


const transactionActionsReducer = (state: Array<Transaction>, action: LoadTransactionList) => {
    switch (action.type) {
        case TransactionActions.Load:
            return action.payload;
        default:
            return [];
    }
};

export function transactionReducer(state: Array<Transaction>, action: LoadTransactionList): Array<Transaction> {
    return transactionActionsReducer(state, action);
}
