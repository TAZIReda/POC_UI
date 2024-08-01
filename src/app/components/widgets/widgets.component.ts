import { Component, ViewChild } from '@angular/core';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { CommonModule } from '@angular/common';
import {SideNavModule,ButtonModule,NumberModule,ComboBoxModule,PanelModule,TabsModule,NFormsModule,TagModule, ColorpickerModule, } from  'ui-components-lib';

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [
    HeaderContentComponent,
    SideNavModule,
    ButtonModule,
    NumberModule,
    ComboBoxModule,
    PanelModule,
    TabsModule,
    NFormsModule,
    TagModule,
    CommonModule,
    ColorpickerModule,
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {

applySettings() {
throw new Error('Method not implemented.');
}

xAxisName: any;
xMin: any;
xMax: any;
yName: any;
yMin: any;
yMax: any;
legendState: any;

apply() {
throw new Error('Method not implemented.');
}

positionLegendValue: any;

positions: any = [
  {content:'Top'},
  {content:'Right'},
  {content:'Bottom'},
  {content:'Left'},
];

format: string = "#0'%'";
nameValue: any;
descriptionValue: any;
valueColor:string;

updateDate(a:any) {
if(this.chartTypeValue.length >0){
  this.chartValue = a[0].content
}
;}
  breadcrumps=[{
  },
  ]

wellboreData  = [
  {
    content: "wellbore one"
  },
  {
    content: "wellbore two"
  },
  {
    content: "wellbore three"
  },
]

wellboreValue: any;

operationsData =[
  {content:'Drilling'},
  {content:'Tripping'},
  {content:'Cementing'},
];

sectionData = [
  {content:'Surface Hole Section'},
  {content:'Intermediate Hole Section'},
  {content:'Casing and Cementing Sections'}
];

tubularData = [
  {content:'item1'},
  {content:'item2'},
  {content:'item3'},
];

operationsValue: any;
sectionValue: any;
tubularValue: any;

availableItems = [
  {
    content: "Entity 1"
  },
  {
    content: "Entity 2"
  },
  {
    content: "Entity 3"
  },
];

chartTypeValue: any;

chartTypeData=[{
  content:"Bar"
},{
  content:"Line"
},{
  content:"Pie"
}];

xUnitData: any[]= [{content:'foot'},{content:'inch'},{content:'meter'}];
xUnitValue: any;
yUnitData: any[]= [{content:'foot'},{content:'inch'},{content:'meter'}];
yUnitValue: any;
pieSize: any[]= [{content:'foot'},{content:'inch'},{content:'meter'}];;
pieSizeValue: any;
chartValue:string = '';


}
