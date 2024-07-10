import { Component, EventEmitter, Output } from '@angular/core';
import { TableModel,TableModule, NFormsModule, FormControlConfig } from 'ui-components-lib';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { DataService } from '../../data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-row',
    standalone: true,
    providers:[DataService],
    templateUrl: './create-row.component.html',
    styleUrl: './create-row.component.scss',
    imports: [
      TableModule,
      HeaderContentComponent,
      NFormsModule,
      HttpClientModule,
      CommonModule
    ]
})
export class CreateRowComponent {

  constructor(
    private dataService :DataService,
    private router: Router
  ){}

create_row() {
this.dataService.setData(this.form_data).subscribe(()=>{})
this.router.navigate(['/crud'])
}

form_data=

  {
    number:'2',

  }
;
formControls=[{
  label:'String',
  type:'text',
  name:'string'
},{
  label:'Boolean',
  type:'toggle',
  name:'Boolean'
},{
  label:'Number',
  type:'number',
  name:'number',
  options: {
    min:2
  }
},
{
  label:'Date',
  type:'datepicker',
  name:'date'
}
]



}
