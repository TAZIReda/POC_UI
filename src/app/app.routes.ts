import { Routes } from '@angular/router';
import { CreateRowComponent } from './components/create-row/create-row.component';
import { CrudComponent } from './components/crud/crud.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { UpdateRowComponent } from './components/update-row/update-row.component';
import { DetailsRowComponent } from './components/details-row/details-row.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TablePoc1Component } from './components/table_poc_1/table_poc_1.component';
import { TablePoc2Component } from './components/table_poc_2/table_poc_2.component';
import { TablePoc3Component } from './components/table_poc_3/table_poc_3.component';
import { PocTestComponentComponent } from './components/poc-test-component/poc-test-component.component';
// import { TablePoc4Component } from './components/table_poc_4/table_poc_4.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        component: CrudComponent,
      },
      {
        path: 'widgets',
        component: WidgetsComponent,
      },
      {
        path: 'table_poc_1',
        component: TablePoc1Component,
      },
      {
        path: 'table_poc_2',
        component: TablePoc2Component,
      },
      {
        path: 'table_poc_3',
        component: TablePoc3Component,
      },
      // {
      //   path: 'table_poc_4',
      //   component: TablePoc4Component,
      // },
      {
        path: 'create',
        component: CreateRowComponent,
      },
      {
        path: 'update/:id',
        component: UpdateRowComponent,
      },
      {
        path: 'details/:id',
        component: DetailsRowComponent,
      },
      {
        path: 'test_poc',
        component: PocTestComponentComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
