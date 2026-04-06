import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio.component/inicio.component';
import { ProductsComponent } from './components/products.component/products.component';

export const routes: Routes = [{
    path: '',
    component: InicioComponent,
  },
  {
    path: 'catalogo',
    component: ProductsComponent
  }
];
