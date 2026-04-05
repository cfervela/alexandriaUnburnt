import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
//import { App } from './app/app';

import { ProductsComponent } from './app/components/products.component/products.component';

bootstrapApplication(ProductsComponent, appConfig)
  .catch((err) => console.error(err));
