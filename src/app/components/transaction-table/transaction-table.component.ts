import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../models/transaction';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import { LoadTransactionList } from '../../actions/transaction.actions';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

enum ROW_TYPE {
    Transaction = 'transaction',
    Bake = 'bake',
    SeedNonceRevelation = 'seed_nonce_revelation'
}

const BATCH_SIZE = 10;

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit, AfterViewInit {

    readonly RowType = ROW_TYPE;

    transactions: Observable<Array<Transaction>>;

    @ViewChild('scrollAnchor', { static: false }) private anchor: ElementRef<HTMLElement>;
    @ViewChild(CdkVirtualScrollViewport, { static: false }) private viewPort: CdkVirtualScrollViewport;

    private loadingIndex = 1;
    private observer: IntersectionObserver;

    constructor(private transactionService: TransactionService,
                private store: Store<AppState>) { }

    ngOnInit(): void {
        this.transactions = this.store.select('transactions');
        this.store.dispatch(new LoadTransactionList());
        this.getTransactions();
    }

    ngAfterViewInit(): void {
        this.listenToInfiniteScroll();
    }

    getRecentTransactions(): void {
        this.loadingIndex = 2;
        this.viewPort.getElementRef().nativeElement.scrollTop = 0;
        this.getTransactions();
    }

    private getTransactions(): void {
        this.transactionService.getTransactions(BATCH_SIZE * this.loadingIndex)
            .subscribe((transactions: Array<Transaction>) => {
                this.store.dispatch(new LoadTransactionList(transactions));
            });
    }

    private listenToInfiniteScroll(): void {
        this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            this.loadMoreResults(entries);
        }, { root: this.viewPort.getElementRef().nativeElement, rootMargin: '150px' });

        this.observer.observe(this.anchor.nativeElement);
    }

    private loadMoreResults(entries: IntersectionObserverEntry[]): void {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && entry.target === this.anchor.nativeElement) {
                this.loadingIndex++;
                this.getTransactions();
            }
        });
    }
}
