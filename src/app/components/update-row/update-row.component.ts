import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from "../header-content/header-content.component";
import {NFormsModule,ProgressIndicatorModule,LoadingModule}from  'ui-components-lib';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-update-row',
    standalone: true,
    templateUrl: './update-row.component.html',
    styleUrl: './update-row.component.scss',
    imports: [
      HeaderContentComponent,
      NFormsModule,
      ProgressIndicatorModule,
      LoadingModule,
      CommonModule
    ]
})
export class UpdateRowComponent {
  constructor(
    private dataService :DataService,
    private router: Router
  ){}

ngOnInit(){
  this.form_data= this.dataService.update()
}


  onCreate() {
    this.dataService.updateRow(this.form_data).subscribe(()=>{})
    this.router.navigate(['/crud'])
  }

form_data={}
;


formControls=[
  {
    label:'Personal Information',
  type:'group',
  name:'personal',
  items:[  {
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
  },  ]
  },
  {
    label:'Contact',
    type:'group',
    name:'contact',
    items:[ 
      {
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
                type: 'regexp',
                patern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
              },
            ],
            options: {
              placeholder: 'Please enter your email',
            },
    },
    ]
  },
  {
    label:'Professional Information',
    type:'group',
    name:'professional',
    items:[ 

      {
        label:'Job Title',
        type:'text',
        name:'jobTitle'
      },
      {
        label:'Employer',
        type:'text',
        name:'employer'
      },
    ]
  },
  

]

steps = [
  // {
  //   text: 'General Information',
  //   state: ['incomplete'],
  // },
  // {
  //   text: 'Step 2',
  //   state: ['incomplete'],
  // },
];
current = 0;
isLoading: boolean | undefined;
maxStep = 2;
spacing = "default";
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
