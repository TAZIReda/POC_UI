import { Component, ViewChild } from '@angular/core';
import { TableModule, NFormsModule, ProgressIndicatorModule,LoadingModule, FormComponent, range } from 'ui-components-lib';
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

  constructor(
    private dataService :DataService,
    private router: Router
  ){}
  breadcrumps=[{
    content:'Users',
    href:'users'
  },{
    content:'Create',
  },
  ]

form_data:any = {};
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
    },
  ],
},
{
  label:'Date Of Birth',
  type:'datepicker',
  name:'dob',
  options: {
    label:'Date Of Birth',
    placeholder: 'Please enter your date of birth',
  },
  validators: [
    {
      type: 'required',
    },
  ],
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
  validators: [
    {
      type: 'required',
    },
  ],
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
            },
          ],
},
{
  label:'Height',
  type:'number',
  name:'tall',
  options: {
    displayFormat:"#0.## cm"
 },
},
    {
      label: 'Description',
      type: 'textarea',
      name: 'description',
      options: {
        invalidText: 'Description is required',
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
      placeholder: 'Please enter your phone number',
    },
    validators: [
      {
        type: 'regexp',
        pattern:'^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
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
            pattern:'^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$'
          },
        ],
        options: {
          placeholder: 'Please enter your email',
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
      },
    ],
  },
  {
    label:'Employer',
    type:'text',
    name:'employer',
    options: {
      // placeholder: 'Please enter your employer',
    },
    validators: [
      {
        type: 'required',
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
  this.router.navigate(['/crud'])

}
onCreate() {

  if(this.form && this.form.validateAll()){


   this.form_data.dow = this.form_data.dow.map((dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
   });
   this.form_data.dob = this.form_data.dob.map((dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
   });
    this.dataService.setData(this.form_data).subscribe(()=>{})
    this.router.navigate(['/users'])

  }

}


}
