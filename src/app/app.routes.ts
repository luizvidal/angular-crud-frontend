import { Routes } from '@angular/router';

import { ProductDeleteComponent } from './components/product/product-delete.component';

import { ProductSaveComponent } from './components/product/product-save.component';
import { HomeComponent } from './views/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductCrudComponent,
  },
  {
    path: 'products/create',
    component: ProductSaveComponent,
  },
  {
    path: 'products/update/:id',
    component: ProductSaveComponent,
  },
  {
    path: 'products/delete/:id',
    component: ProductDeleteComponent,
  },
];
