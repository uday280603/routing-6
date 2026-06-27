import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent } from './shared/component/PRODUCT/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './shared/component/PRODUCT/product-form/product-form.component';
import { ProductComponent } from './shared/component/PRODUCT/product/product.component';
import { HomeComponent } from './shared/component/HOME/home/home.component';
import { UserDashboardComponent } from './shared/component/USER/user-dashboard/user-dashboard.component';
import { UserComponent } from './shared/component/USER/user/user.component';
import { UserFormComponent } from './shared/component/USER/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UserDashboardComponent,
    children: [
      {
        path: 'addUser',
        component: UserFormComponent,
      },
      {
        path: ':userId',
        component: UserComponent,
      },
      {
        path: ':userId/edit',
        component: UserFormComponent,
      },
    ],
  },
  {
    path: 'products',
    component: ProductDashboardComponent,
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent,
      },
      {
        path: ':productId',
        component: ProductComponent,
      },

      {
        path: ':productId/edit',
        component: ProductFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
