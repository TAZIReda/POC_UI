import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from "../header-content/header-content.component";
import {NFormsModule,ProgressIndicatorModule,LoadingModule}from  'ui-components-lib';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ){}

  form_data={};
  data:any
  detailId: string | null;

ngOnInit(){
  this.route.paramMap.subscribe(params => {
    this.detailId = params.get('id');
    this.dataService.getDataById(this.detailId).subscribe((data:any)=>{
      this.data=data
      this.form_data=data
    })
  });

}

breadcrumps=[{
  content:'Users',
  href:'users'
},{
  content:'Edit',
},
]


  onCreate() {
    this.dataService.update(this.form_data).subscribe(()=>{})
    this.router.navigate(['/users'])
  }

formControls=[
  {
    label:'Personal Information',
  type:'group',
  name:'personal',
  items:[    
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
{label:'Date Of Birth',
  type:'datepicker',
  name:'dob',
  options: {
    placeholder: 'Please enter your date of birth',
  },
  validators: [
    {
      type: 'required',
      message: 'Date Of Birth is required'
    },
  ],
},
{ label:'Gender',
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
      message: 'Gender is required'
    },
  ],
},
{ label:'Country',
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
    displayFormat:"#0.## cm"
 },
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
      } 
    ]
  },
  

]

back() {
  this.router.navigate(['/users'])
}

}
