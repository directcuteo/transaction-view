import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Transaction } from '../../models/transaction';

describe('TransactionService', () => {
    let service: TransactionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [TransactionService]
        });
        service = TestBed.get(TransactionService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to retrieve data from the API via GET', () => {

        const API = 'https://api.tzstats.com/tables/op';
        const URL_CONFIG = `?columns=row_id,time,type,sender,volume,status&receiver=tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo&cursor.lte=18990092`;

        const dummyData: Transaction[] = [{
            rowId: 123456,
            time: new Date(1576400509000),
            type: 'transaction',
            sender: 'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
            status: 'applied',
            volume: 918237,
            minifiedAddress: ''
        }, {
            rowId: 62432,
            time: new Date(1450080509000),
            type: 'transaction',
            sender: 'tz1bDXD6nNSrebqmjeLUfhjd1QdePSMCj2MX',
            status: 'applied',
            volume: 829374,
            minifiedAddress: ''
        }];

        service.getTransactions(2).subscribe(response => {
            expect(response.length).toBe(2);
            expect(response).toEqual(dummyData);
        });
        const request = httpMock.expectOne(`${API + URL_CONFIG}&limit=2`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyData);
        httpMock.verify();
    });
});
