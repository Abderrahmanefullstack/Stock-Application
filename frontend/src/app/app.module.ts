import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { StockMovementComponent } from './components/stock/stock-movement/stock-movement.component';
import { StockAlertComponent } from './components/stock/stock-alert/stock-alert.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiInterceptor } from './services/api.interceptor';
import { ProductService } from './services/product.service';
import { StockService } from './services/stock.service';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProductListComponent,
        ProductFormComponent,
        ProductDetailComponent,
        StockMovementComponent,
        StockAlertComponent,
        NavbarComponent,
        FooterComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        AuthService,
        ProductService,
        StockService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }