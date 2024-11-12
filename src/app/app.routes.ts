import { Routes } from '@angular/router';
import { PRODUCT_ROUTES } from './view/product/product.routes';
import { CLIENT_ROUTES } from './view/client/client.routes';
import { BUDGET_ROUTES } from './view/budget/budget.routes';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'product'
    },
    {
        path: 'product', loadChildren: () => PRODUCT_ROUTES
    },
    {
        path: 'client', loadChildren: () => CLIENT_ROUTES
    },
    {
        path: 'budget', loadChildren: () => BUDGET_ROUTES
    }
];
