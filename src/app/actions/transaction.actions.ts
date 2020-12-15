import { Action } from '@ngrx/store';
import { Transaction } from '../models/transaction';

export enum TransactionActions {
    Load = '[Transaction] Load',
}

export class LoadTransactionList implements Action {
    readonly type: string = TransactionActions.Load;

    constructor(public payload: Array<Transaction> = []) { }
}
