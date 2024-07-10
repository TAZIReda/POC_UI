import { Routes } from '@angular/router';
import { CreateRowComponent } from './components/create-row/create-row.component';
import { CrudComponent } from './components/crud/crud.component';
import { WidgetsComponent } from './components/widgets/widgets.component';

export const routes: Routes = [{
    path:'crud',
    component:CrudComponent
},{
    path:'widgets',
    component:WidgetsComponent
},{
    path:'create',
    component:CreateRowComponent
}
];
