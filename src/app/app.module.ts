import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './reducers/transaction.reducer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconRegisterService } from './services/mat-icon-register/mat-icon-register.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


export function initIcons(matIconService: MatIconRegisterService): () => void {
    return () => matIconService.registerIcons();
}

@NgModule({
    declarations: [
        AppComponent,
        TransactionTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({
            transactions: transactionReducer
        }),
        ScrollingModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initIcons,
            deps: [MatIconRegisterService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
