import {Routes} from '@angular/router';
import {DemoComponent} from '../demo/demo.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoComponent
  }
]
