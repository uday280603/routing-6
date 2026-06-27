import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './shared/component/HOME/home/home.component';
import { NavbarComponent } from './shared/component/NAVBAR/navbar/navbar.component';
import { ProductComponent } from './shared/component/PRODUCT/product/product.component';
import { ProductFormComponent } from './shared/component/PRODUCT/product-form/product-form.component';
import { ProductDashboardComponent } from './shared/component/PRODUCT/product-dashboard/product-dashboard.component';
import { MaterialModule } from './shared/module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './shared/component/HOME/get-confirm/get-confirm.component';
import { UserComponent } from './shared/component/USER/user/user.component';
import { UserFormComponent } from './shared/component/USER/user-form/user-form.component';
import { UserDashboardComponent } from './shared/component/USER/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    ProductFormComponent,
    ProductDashboardComponent,
    GetConfirmComponent,
    UserComponent,
    UserFormComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
