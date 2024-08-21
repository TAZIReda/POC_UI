import { Component, TemplateRef, ViewChild, ViewContainerRef, viewChild } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel,TableModule,DialogModule,NFormsModule, ModalModule,NotificationModule, NotificationService, NotificationContent } from 'ui-components-lib';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    NotificationModule
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  constructor(private router: Router,
    protected notificationService: NotificationService,
     private dataService:DataService  ,  private viewContainer: ViewContainerRef,
    ){
      this.notificationService.viewContainer = viewContainer;
    }

     @ViewChild("overflowMenuItemTemplate")
overflowMenuItemTemplate: TemplateRef<any>[] | undefined;

@ViewChild("notification") notification:Notification

  notificationObject: any;
  showCloseButton: boolean=false;
  datatoDelete:any = {}
  breadcrumps=[{

  },
  ]
  model = new TableModel();
headerItems=[];
title: any;
open=false
isOpen=false

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

selectedIndex = null;


  ngOnInit(){
    
    this.dataService.dataSubject.subscribe((res)=>{
  this.notificationObject = res.data;
  if (Object.keys(res).length > 0){
    this.showNotification(this.notificationObject)
  }
});

  }
  ngAfterViewInit(){
    this.fetchData();
  }

confirmDelete() {
  this.open=false;
  this.dataService.deleteRow(this.datatoDelete).subscribe((res:any)=>{
    if(res){
    this.notificationService.notifySuccessfulAction();
      this.fetchData()
    }
  });
  }

  

cancel() {
  this.open=false
}


clickEdit(data:any) {
  this.dataService.updateRow(data.id)
}

clickDelete(data:any) {
  this.datatoDelete = data;
    this.open = true
}

clickDetails(data:any) {
  this.dataService.detailsRow(data.id)
}

navigateToRoute() {
this.router.navigate(['/create'])
}

  showNotification(val:any) {
    // this.notification. ;
    // this.notificationService.showActionable(val);
    this.notificationService.notifySuccessfulAction();
  }

  fetchData(){
    const arryData: any=[]
  this.dataService.getData().subscribe((elements)=>{ 
  elements.forEach((element: any) => {
  element.hobbies = element.hobbies.map((hobby: any) => hobby.content);
   element.dob = element.dob.map((dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString()
   });
    // element.gender = element.gender[0].content
    arryData.push([
      new TableItem({ data: element.firstName}),
      new TableItem({ data: element.lastName }),
      new TableItem({ data: element.dob }),
      new TableItem({ data: element.gender }),
      new TableItem({ data: element.country }),
      new TableItem({ data: element.jobTitle }),
      new TableItem({ data: element , template: this.overflowMenuItemTemplate })
    ]) 
 } 
)

this.model.data = arryData;
});

const myHeaders= [
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
        data: 'Gender',
        dataType: 'advanced_select',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Country',
        dataType: 'select',
        title: 'my-class',
      }),
      // new TableHeaderItem({
      //   data: 'Height (cm)',
      //   dataType: 'string',
      //   title: 'my-class',
      // }),
      // new TableHeaderItem({
      //   data: 'Description',
      //   dataType: 'textarea',
      //   className: 'my-class',
      // }),
      // new TableHeaderItem({
      //   data: 'Phone',
      //   dataType: 'text',
      //   className: 'my-class',
      // }),
      // new TableHeaderItem({
      //   data: 'Email',
      //   dataType: 'text',
      //   className: 'my-class',
      // }),
      new TableHeaderItem({
        data: 'JobTitle',
        dataType: 'text',
        className: 'my-class',
      }),
      // new TableHeaderItem({
      //   data: 'Employer',
      //   dataType: 'text',
      //   className: 'my-class',
      // }),
      // new TableHeaderItem({
      //   data: 'Date Of Work',
      //   dataType: 'date',
      //   className: 'my-class',
      // }),
      //    new TableHeaderItem({
      //     data: 'Hobbies',
      //     dataType: 'advanced_select',
      //     className: 'my-class',
      //   }),
      //   new TableHeaderItem({
      //     data: 'Agree',
      //     dataType: 'boolean',
      //     className: 'my-class',
      //   }),
      new TableHeaderItem({ 
        data: 'Actions',
        dataType: 'string',
        className: 'my-class',
       }),

    ];

    this.model.initializeHeaders(myHeaders)

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );
  }


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
    this.router.navigate(['/users'])
  }


  notificationObjectDelete:any = {
    type:'showActionable',
    data:{
      type: "success",
      title: "SUCCESS",
      message: "User deleted successfully",
      lowContrast: true,
      target: ".notification-container",
    }
  }
  
}
