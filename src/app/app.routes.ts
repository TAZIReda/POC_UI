import { Routes } from '@angular/router';
import { CreateRowComponent } from './components/create-row/create-row.component';
import { CrudComponent } from './components/crud/crud.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { UpdateRowComponent } from './components/update-row/update-row.component';
import { DetailsRowComponent } from './components/details-row/details-row.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
{
    path:'',
    redirectTo:'login',
    pathMatch:'full'
},
{
    path:'',
    component:LayoutComponent,
    children:[
        {
            path:'crud',
            component:CrudComponent
        },{
            path:'widgets',
            component:WidgetsComponent
        },{
            path:'create',
            component:CreateRowComponent
        },
        {
            path:'update',
            component:UpdateRowComponent
        },
        {
            path:'details',
            component:DetailsRowComponent
        },
    ]
},
{
    path:'login',
    component:LoginComponent
}

];
