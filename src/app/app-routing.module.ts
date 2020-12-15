import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';

const routes: Routes = [
    {
        path: 'transaction-list',
        component: TransactionTableComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transaction-list'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'transaction-list'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
