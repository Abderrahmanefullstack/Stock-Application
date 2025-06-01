import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { StockMovementComponent } from './components/stock/stock-movement/stock-movement.component';
import { StockAlertComponent } from './components/stock/stock-alert/stock-alert.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard] },
    { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    { path: 'products/:id/edit', component: ProductFormComponent, canActivate: [AuthGuard] },
    { path: 'stock/movement', component: StockMovementComponent, canActivate: [AuthGuard] },
    { path: 'stock/alerts', component: StockAlertComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }