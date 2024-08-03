import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule,FormComponent,NFormsModule, ComboboxDisplayValuesEnum } from 'ui-components-lib';
import { DataService } from '../../data.service';

import { HeaderContentComponent } from "../header-content/header-content.component";

@Component({
  selector: 'app-details-row',
  standalone: true,
  imports: [TabsModule, HeaderContentComponent,NFormsModule],
  templateUrl: './details-row.component.html',
  styleUrl: './details-row.component.scss'
})
export class DetailsRowComponent {
  detailId: string | null;
  data: any;
  constructor(private route: ActivatedRoute,
    private dataService: DataService
  ) { }
  form_data:any = {}
  breadcrumps=[{
    content:'Users',
    href:'users'
  },{
    content:'Details',
  },
  ]
  dis=ComboboxDisplayValuesEnum.Selected

ngOnInit(){
  this.route.paramMap.subscribe(params => {
    this.detailId = params.get('id');
    this.dataService.getDataById(this.detailId).subscribe((data:any)=>{
      this.data=data
      this.form_data = data
      console.log(this.form_data);
    })
  });
}

formControls=[
    
  {
    label:'First Name',
    colSpan:1,
    type:'text',
    
    name:'firstName',
    options: {
      placeholder: 'Your First Name',
      disabled:true
    },
    validators: [
      {
        type: 'required',
      },
    ],
  },
  {
    label:'Last Name',
    colSpan:1,
    type:'text',
    name:'lastName',
    options: {
      placeholder: 'Your Last Name',
      disabled:true

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
    colSpan:1,
    name:'dob',
    options: {
      placeholder: 'Please enter your date of birth',
      disabled:true

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
    colSpan:1,
    name:'gender',
    options: {
      displaySelectedValues: false,
      disabled:true
,
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
    colSpan:1,
    name:'country',
    options: {
             
              invalidText: 'Country ',
              invalid: true,
              disabled:true
,
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
    colSpan:1,
    name:'tall',
    options: {
      displayFormat:"#0.## cm",
      disabled:true

   },
  },
      {
        label: 'Description',
        type: 'textarea',
        colSpan:2,
        name: 'description',
        options: {
          invalidText: 'Description is required',
          disabled: true,
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
          disabled:true,
        },
        validators: [
          {
            type: 'required',
          },
        ],
      },
      
      {
        label:'Email',
        type:'text',
        name:'email',
              validators: [
              {
                type: 'required',
              },
            ],
            options: {
              placeholder: 'Please enter your email',
              disabled:true,

            },
      }, ]

      formControls3=[
        {
          label:'Job Title',
          colSpan:1,
          type:'text',
          name:'jobTitle',
          options:{
            disabled:true,

          },
          validators: [
            {
              type: 'required',
            },
          ],
        },
        {
          label:'Employer',
          colSpan:1,
          type:'text',
          name:'employer',
          options:{
            disabled:true,

          },
          validators: [
            {
              type: 'required',
            },
          ],
        },
        {
          label:'Date Of start work',
          colSpan:2,
          type:'datepicker',
          name:'dow',
          options: {
            placeholder: 'Please enter your date of birth',
            range:true,
            rangeLabel:'Date Of end work',
            label:'Date Of start work',
            disabled:true,

          },
         
        }, 
        {
          label:'Hobbies',
          colSpan:2,
          type:'advanced_select',
          name:'hobbies',
          options: {
            displayValues: this.dis,  
            disabled:true,
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
          colSpan:2,
          type:'checkbox',
          name:'agree',
          options:{
            disabled:true
          }
        }, ]
}
