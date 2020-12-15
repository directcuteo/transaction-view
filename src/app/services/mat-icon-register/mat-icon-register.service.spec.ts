import { TestBed } from '@angular/core/testing';

import { MatIconRegisterService } from './mat-icon-register.service';

describe('MatIconRegisterService', () => {
    let service: MatIconRegisterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MatIconRegisterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
