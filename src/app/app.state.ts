import { Transaction } from './models/transaction';

export interface AppState {
    readonly transactions: Array<Transaction>;
}
