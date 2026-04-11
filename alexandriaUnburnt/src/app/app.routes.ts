import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio.component/inicio.component';
import { ProductsComponent } from './components/products.component/products.component';
import {BookComponent} from './components/book.component/book.component';
import { ContactoComponent } from './components/contacto.component/contacto.component';

export const routes: Routes = [{
    path: '',
    component: InicioComponent,
  },
  {
    path: 'catalogo',
    component: ProductsComponent
  },
  {
    path: 'catalogo/:isbn',
    component: BookComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'contacto',
    component: ContactoComponent
  }
];
