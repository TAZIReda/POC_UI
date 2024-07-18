import { Component, ViewChild } from '@angular/core';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { CommonModule } from '@angular/common';
import {SideNavModule,ButtonModule,NumberModule,ComboBoxModule,PanelModule,TabsModule,NFormsModule,TagModule } from  'ui-components-lib';

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
    CommonModule
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
positions: any = [{content:'Top'},{content:'Right'},{content:'Bottom'},{content:'Left'},];
format: string = "#0'%'";
nameValue: any;
descriptionValue: any;
;

updateDate(a:any) {
if(this.chartTypeValue.length >0){
  this.chartValue = a[0].content
  console.log(this.chartValue);
}
;}
  breadcrumps=[{
  },
  ]
wellboreData  = [
  {
    content: "one"
  },
  {
    content: "two"
  },
  {
    content: "three"
  },
]
wellboreValue: any;
operationsData =[{content:'item1'},{content:'item2'},{content:'item3'},{content:'item4'},];
sectionData = [{content:'item1'},{content:'item2'},{content:'item3'},{content:'item4'},];
tubularData = [{content:'item1'},{content:'item2'},{content:'item3'},{content:'item4'},];
operationsValue: any;
sectionValue: any;
tubularValue: any;
availableItems = [
  {
    content: "one"
  },
  {
    content: "two"
  },
  {
    content: "three"
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
