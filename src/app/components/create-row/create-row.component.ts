import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TableModule, NFormsModule, ProgressIndicatorModule,LoadingModule, FormComponent, range, ComboboxDisplayValuesEnum,NotificationModule, NotificationService } from 'ui-components-lib';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { DataService } from '../../data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-row',
    standalone: true,
    providers:[],
    templateUrl: './create-row.component.html',
    styleUrl: './create-row.component.scss',
    imports: [
      TableModule,
      HeaderContentComponent,
      NFormsModule,
      HttpClientModule,
      CommonModule,
      ProgressIndicatorModule,
      LoadingModule,
      NotificationModule
    ]
})
export class CreateRowComponent {

@ViewChild("form") form:FormComponent

  constructor(
    private dataService :DataService,
    private router: Router,
    protected notificationService: NotificationService,
    private viewContainer: ViewContainerRef,
  ){
    this.notificationService.viewContainer = viewContainer;
  }
  breadcrumps=[{
    content:'Users',
    href:'users'
  },{
    content:'Create',
  },
  ]

  display :ComboboxDisplayValuesEnum = ComboboxDisplayValuesEnum.Both
form_data:any = {};
numberFormat= "#0.## 'cm'"
formControls=[
    
{
  label:'First Name',
  type:'text',
  name:'firstName',
  options: {
    placeholder: 'Your First Name',
  },
  validators: [
    {
      type: 'required',
      message: 'First Name is required'
    },
  ],
 
},
{
  label:'Last Name',
  type:'text',
  name:'lastName',
  options: {
    placeholder: 'Your Last Name',
  },
  validators: [
    {
      type: 'required',
      message: 'Last Name is required'
    },
  ],
},
{
  label:'Date Of Birth',
  type:'datepicker',
  name:'dob',
  options: {
    placeholder: 'Please enter your date of birth',
    // dateFormat:this.dateFormat,
  },
  validators: [
    {
      type: 'required',
      message: 'Date Of Birth is required'
    },
  ],
},
{
  label:'Gender',
  type:'radio',
  name:'gender',
  options: {
    options: ['Man', 'Woman'],
  },
 },
{
  label:'Country',
  type:'select',
  name:'country',
  options: {
           
            invalidText: 'Country ',
            invalid: true,
            warn: false,
            warnText: '',
            display: '',
            options: [
              { label: 'USA', value: 'USA' },
              { label: 'Canada', value: 'Canada' },
              { label: 'UK', value: 'UK' },
            ],
          },
          validators: [
            {
              type: 'required',
              message: 'Country is required'
            },
          ],
},
{
  label:'Height',
  type:'number',
  name:'tall',
  options: {
    displayFormat:this.numberFormat,
    activeUpDown:false
 
 },
   validators: [
    {
      type: 'required',
      message: 'Gender is required'
    },
  ],
},
    {
      label: 'Description',
      type: 'textarea',
      name: 'description',
      options: {
        disabled: false,
        placeholder: 'Enter your Description',
      },
    },
    
  ]
  

formControls2=[ 
  {
 
    label:'Phone',
    type:'text',
    name:'phone',
    options: {
      placeholder: '111-111-1111',
    },
    validators: [
      {
        type: 'regexp',
        pattern:'^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
        message:'Invalid Format Number'
      },
    ],
  },
  
  {
    label:'Email',
    type:'text',
    name:'email',
          validators: [
         {
            type: 'regexp',
            pattern:'^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$',
            message:'Invalid Format Email'
          },
        ],
        options: {
          placeholder: 'example123@exam.com',
        },
  }, ]

formControls3=[
  {
    label:'Job Title',
    type:'text',
    name:'jobTitle',
    options: {
      placeholder: 'Please enter your Job',
    },
    validators: [
      {
        type: 'required',
        message: 'Job Title is required'
      },
    ],
  },
  {
    label:'Employer',
    type:'text',
    name:'employer',
    options: {
    },
    validators: [
      {
        type: 'required',
        message: 'Employer is required'
      },
    ],
  },
  {
    label:'Date Of start work',
    type:'datepicker',
    name:'dow',
    options: {
      placeholder: 'Please enter your date of birth',
      range:true,
      rangeLabel:'Date Of end work',
      label:'Date Of start work'
    },
   
  }, 
  {
    label:'Hobbies',
    type:'advanced_select',
    name:'hobbies',
    options: {
      displaySelectedValues: true,
      placeholder:"select hobbies",
      type:'multi',
      isGrouped:'true',
      displayValues:this.display,
      items: [
        

            {parent:'Sport',
            content: "Hiking"
          },
          {parent:'Sport',
            content: "Kayaking"
       
          },
        {parent:'literature',
          content: "Reading"
        },
        {parent:'literature',
          content: "Writing"
        },
        {parent:'Sport',
          content: "Fishing"
        },
        {parent:'Sport',
          content: "Surfing"
        },
        {parent:'Sport',
          content: "Swiming"
        },
      ],
     
    },
  },
  {
    label:'Do you agree with Terms',
    type:'checkbox',
    name:'agree'
  } ]


steps = [
  {
    label: 'Personal Information',
    state: ['incomplete'],
  },
  {
    label: 'Contact',
    state: ['incomplete'],
  },
  {
    label: 'Professional Information',
    state: ['incomplete'],
  },
];
current = 0;
isLoading: boolean | undefined;
maxStep = 2;
spacing = "default";
showCreateButton = false;
showNextButton = true;
showBacktButton = false;  

nextStep() {
  if(this.form && this.form.validateAll()){
    if (this.current < this.maxStep) {
      this.current += 1;
      this.showBacktButton = true;
    }
    if (this.current === this.maxStep) {
      this.showCreateButton = true;
      this.showNextButton = false;
    }
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

formatDate(date:any) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return [`${month}/${day}/${year}`];
}

onCreate() {
  if(this.form && this.form.validateAll()){
    this.dataService.setData(this.form_data).subscribe((element)=>{
      element.dob = this.formatDate(this.form_data.dob[0])
    })
    this.sendData();
      this.router.navigate(['/users'])
  }

}
notificationObject:any = {
  type:'showActionable',
  data:{
    type: "success",
    title: "SUCCESS",
    message: "User created successfully",
    lowContrast: true,
    target: ".toast-container",
  }
}

sendData(): void {
  this.dataService.setNotification(this.notificationObject);
}

}
