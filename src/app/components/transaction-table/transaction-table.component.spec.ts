import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TransactionTableComponent } from './transaction-table.component';
import { TransactionService } from '../../services/transaction/transaction.service';
import { defer, Observable, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScannedActionsSubject, StoreModule } from '@ngrx/store';
import { transactionReducer } from '../../reducers/transaction.reducer';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, Injectable, Input } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Transaction } from '../../models/transaction';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoadTransactionList } from '../../actions/transaction.actions';

@Injectable()
class TransactionServiceMock {

    getTransactions(limit: number): Observable<Array<Transaction>> {
        const transactionArray = new Array<Transaction>();

        const t = new Transaction();
        t.rowId = 123;
        t.volume = 1000;
        t.sender = 'tzoweif02JO983NFKore4lkerjfXjz';
        t.status = 'applied';
        t.type = 'transaction';
        t.time = new Date();
        t.minifiedAddress = 'tz...fXjz';

        for (let i = 0; i < limit; i++) {
            transactionArray.push(t);
        }

        return defer(() => Promise.resolve(transactionArray));
    }
}

@Component({
    selector: 'mat-icon',
    template: '<span></span>'
})
class MockMatIconComponent {
    @Input() svgIcon: any;
    @Input() fontSet: any;
    @Input() fontIcon: any;
}

describe('TransactionTableComponent', () => {
    let component: TransactionTableComponent;
    let fixture: ComponentFixture<TransactionTableComponent>;
    let transactionService: TransactionService;
    let httpTestingController: HttpTestingController;
    let mockStore: MockStore;
    let actions: Observable<any>;


    beforeEach(async () => {
        const initialState = null;
        await TestBed.configureTestingModule({
            declarations: [
                TransactionTableComponent,
            ],
            imports: [
                HttpClientTestingModule,
                ScrollingModule,
                MatIconModule,
                MatTooltipModule,
                StoreModule.forRoot({
                    reducer: transactionReducer
                }),
            ],
            providers: [
                {
                    provide: TransactionService,
                    useValue: TransactionServiceMock
                },
                provideMockActions(() => actions),
                provideMockStore({ initialState })
            ]
        })
            .overrideComponent(TransactionTableComponent, {
                set: {
                    providers: [
                        { provide: TransactionService, useClass: TransactionServiceMock },
                    ]
                }
            })
            .overrideModule(MatIconModule, {
                remove: {
                    declarations: [MatIcon],
                    exports: [MatIcon]
                },
                add: {
                    declarations: [MockMatIconComponent],
                    exports: [MockMatIconComponent]
                }
            })
            .compileComponents();

        httpTestingController = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionTableComponent);
        component = fixture.componentInstance;
        transactionService = fixture.debugElement.injector.get(TransactionService);
        actions = TestBed.inject(ScannedActionsSubject);
        mockStore = TestBed.inject(MockStore);

        fixture.detectChanges();
    });

    it('should create', fakeAsync(() => {
        // failing because ngRx is not well configured. Working if comment component's line 45
        actions = of({ type: LoadTransactionList });
        const expectedAction = new LoadTransactionList();
        const dispatchSpy = spyOn(mockStore, 'dispatch');

        fixture.detectChanges();

        const spy = spyOn(transactionService, 'getTransactions').and.returnValue(
            of([new Transaction()])
        );
        component.ngOnInit();
        fixture.detectChanges();

        expect(spy.calls.any()).toEqual(true);
        expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
        mockStore.dispatch(new LoadTransactionList([]));

        fixture.detectChanges();

        expect(component).toBeTruthy();
    }));
});
