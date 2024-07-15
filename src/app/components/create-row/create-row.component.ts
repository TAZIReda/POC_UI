import { Component, ViewChild } from '@angular/core';
import { TableModule, NFormsModule, ProgressIndicatorModule,LoadingModule, FormComponent } from 'ui-components-lib';
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
      CommonModule,
      ProgressIndicatorModule,
      LoadingModule
    ]
})
export class CreateRowComponent {

@ViewChild("form") form:FormComponent

onCreate() {
  if(this.form && this.form.validateAll()){
    this.dataService.setData(this.form_data).subscribe(()=>{})
    this.router.navigate(['/crud'])
  }

}

  constructor(
    private dataService :DataService,
    private router: Router
  ){}


form_data=

  {
    firstName:'Smartest',
    lastName:'Algeria',
    dob:'02/21/2019',
    country:'USA',
    description:'Tech Company ',
    phone:'023234576',
    email:'smartest@algeria.dz',
    jobTitle:'Info',
    employer:'SOVAC'

  }
;
formControls=[
    
  {
  label:'First Name',
  type:'text',
  name:'firstName',
  options: {
    placeholder: 'Your First Name',
  },
},
{
  label:'Last Name',
  type:'text',
  name:'lastName',
  options: {
    placeholder: 'Your Last Name',
  },
},
{
  label:'Date Of Birth',
  type:'datepicker',
  name:'dob',
  options: {
    placeholder: 'Please enter your date of birth',
  },
},
{
  label:'Gender',
  type:'advanced_select',
  name:'gender',
  options: {
    displaySelectedValues: false,
    placeholder:"select your gender",
    type:'single',
    items: [
      {
        content: "Man"
      },
      {
        content: "Woman"
      },
    ],
   
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
},
    {
      label: 'Description',
      type: 'textarea',
      name: 'description',
      validators: [
        {
          type: 'required',
          Description: 'Description is required',
        },
      ],
      options: {
        invalidText: 'Description is required',
        disabled: false,
        placeholder: 'Enter your Description',
      },
    },
  ]
  

formControls2=[ {
 
    label:'Phone',
    type:'text',
    name:'phone',
    options: {
      placeholder: 'Please enter your phone number',
    },
  },
  
  {
    label:'Email',
    type:'text',
    name:'email',
          validators: [
          {
            type: 'required',
            // patern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
          },
        ],
        options: {
          placeholder: 'Please enter your email',
        },
  }, ]

formControls3=[{
 
    label:'Job Title',
    type:'text',
    name:'jobTitle'
  },
  {
    label:'Employer',
    type:'text',
    name:'employer'
  }, ]


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
  this.router.navigate(['/crud'])

}

}
