import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../models/transaction';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private readonly API = 'https://api.tzstats.com/tables/op';
    private readonly GET_TRANSACTIONS_CONFIG = `?columns=row_id,time,type,sender,volume,status&receiver=tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo&cursor.lte=18990092`;

    constructor(private http: HttpClient) { }

    getTransactions(limit: number): Observable<Array<Transaction>> {
        return this.http.get<Array<Array<any>>>(`${this.API}${this.GET_TRANSACTIONS_CONFIG}&limit=${limit}`)
            .pipe(
                map((response: Array<Array<any>>) => TransactionService.mapGetTransactionsResponse(response)),
                catchError(err => throwError(err))
            );
    }

    private static mapGetTransactionsResponse(response: Array<Array<any>>): Array<Transaction> {
        const transactions = new Array<Transaction>();
        response.forEach((item: Array<any>) => {
            const transaction = new Transaction();
            transaction.rowId = item[0];
            transaction.time = new Date(item[1]);
            transaction.type = item[2];
            transaction.sender = item[3];
            transaction.volume = item[4];
            transaction.status = item[5];
            transaction.minifiedAddress = this.getMinifiedAddress(transaction.sender);
            transactions.push(transaction);
        });
        return transactions;
    }

    private static getMinifiedAddress(sender: string): string {
        return `${sender.slice(0, 2)}...${sender.slice(sender.length - 4)}`;
    }
}
