import { Component } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel,TableModule } from 'ui-components-lib';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { Router } from '@angular/router';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [TableModule,HeaderContentComponent],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

navigateToRoute() {
this.router.navigate(['/create'])}
  model = new TableModel();
  headerItems=[];
  title: any;

constructor(private router: Router, private dataService:DataService) {}

  ngOnInit() {
    const arryData: any=[]
this.dataService.getData().subscribe((elements)=>{ 
  elements.forEach((element: any) => {
    
    arryData.push([
      new TableItem({ data: element.string}),
      new TableItem({ data: element.number }),
      new TableItem({ data: element.date }),
      new TableItem({ data: element.Boolean }),
    ]) 
 } 
)
this.model.data = arryData;
});

    this.model.header = [
      new TableHeaderItem({
        data: 'String',
        dataType: 'string',
        title: 'Table header title',
      }),
      new TableHeaderItem({
        data: 'Number',
        dataType: 'number',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Date',
        dataType: 'date',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Boolean',
        dataType: 'boolean',
        className: 'my-class',
      }),
    ];

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );
  }
}
