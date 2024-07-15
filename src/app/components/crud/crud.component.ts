import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel,TableModule,DialogModule,NFormsModule, ModalModule } from 'ui-components-lib';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { Router } from '@angular/router';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [TableModule,HeaderContentComponent,
    DialogModule,NFormsModule,ModalModule
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {
cancel() {
  this.open=false
}
showCloseButton: boolean=false;

clickEdit(data:any) {
  this.router.navigate(['/update'])
  this.dataService.updateRow(data)
}

clickDelete(data:any) {
  if (this.open == false){
    this.open=true
  }else 
  {
    this.open=false;
    this.dataService.deleteRow(data).subscribe((res:any)=>{
      if(res){this.fetchData()}
    });
    
  }
}

clickDetails(data:any) {
  this.dataService.detailsRow(data)
}

@ViewChild("overflowMenuItemTemplate", { static: false })
overflowMenuItemTemplate: TemplateRef<any> | undefined;
secondOption: any;

navigateToRoute() {
this.router.navigate(['/create'])
}

model = new TableModel();
headerItems=[];
title: any;
open=false
constructor(private router: Router, private dataService:DataService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){

    const arryData: any=[]
  this.dataService.getData().subscribe((elements)=>{ 
  elements.forEach((element: any) => {
    
    arryData.push([
      new TableItem({ data: element.firstName}),
      new TableItem({ data: element.lastName }),
      new TableItem({ data: element.dob }),
      new TableItem({ data: element.country }),
      new TableItem({ data: element.description }),
      new TableItem({ data: element.phone }),
      new TableItem({ data: element.email }),
      new TableItem({ data: element.jobTitle }),
      new TableItem({ data: element.employer }),
      new TableItem({ data: element , template: this.overflowMenuItemTemplate })
    ]) 
 } 
)
this.model.data = arryData;
});
    this.model.header = [
      new TableHeaderItem({
        data: 'First Name',
        dataType: 'string',
        title: 'Table header title',
      }),
      new TableHeaderItem({
        data: 'Last Name',
        dataType: 'string',
        title: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Date Of Birth',
        dataType: 'date',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Country',
        dataType: 'select',
        title: 'my-class',
      }),
      
      new TableHeaderItem({
        data: 'Description',
        dataType: 'textarea',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Phone',
        dataType: 'text',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Email',
        dataType: 'text',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'JobTitle',
        dataType: 'text',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Employer',
        dataType: 'text',
        className: 'my-class',
      }),
      new TableHeaderItem({ 
        data: 'Actions',
        dataType: 'string',
        className: 'my-class', })
    ];

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );
  }

  steps = [
    {
      text: 'General Information',
      state: ['incomplete'],
    },
    {
      text: 'Step 2',
      state: ['incomplete'],
    },
  ];
  current = 0;
  isLoading: boolean | undefined;
  maxStep = 1;
  spacing = 'default';
  showCreateButton = false;
  showNextButton = true;
  showBacktButton = false;  
  
  nextStep() {
      if (this.current < this.maxStep) {
        this.current += 1;
        this.showBacktButton = true;
      }
      if (this.current === this.maxStep) {
        this.showCreateButton = true;
        this.showNextButton = false;
      }
  }

  PreviousStep() {
    if (this.current > 0) {
      this.current -= 1;
      this.showCreateButton = false;
      this.showNextButton = true;
      if (this.current == 0) this.showBacktButton = false;
    }
  }

  back() {
    this.router.navigate(['/crud'])
  }

}
