import { Component, ViewChild } from '@angular/core';
import { HeaderContentComponent } from "../header-content/header-content.component";
import { CommonModule } from '@angular/common';
import {SideNavModule,ButtonModule,NumberModule,ComboBoxModule,PanelModule,TabsModule,NFormsModule,TagModule, ColorpickerModule, } from  'ui-components-lib';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
interface Settings {
  nameValue: string;
  descriptionValue: string;
  wellboreValue: string;
  operationsValue: string;
  sectionValue: string;
  tubularValue: string;
  tagsEntity: string;
  chartTypeValue: string;
  xAxisName: string;
  yUnitValue: string;
  xMin: string;
  xMax: string;
  yName: string;
  xUnitValue: string;
  yMin: string;
  yMax: string;
  pieSizeValue: string; // Example: Expecting pieSize to be a string array
  valueColor: string;
  legendState: string;
  positionLegendValue: string;
}@Component({
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

  constructor(
    private dataService :DataService,
    private router: Router,
  ){
  }

ngOnInit(){
  this.dataService.getDataSettings().subscribe((element)=>{
    this.settingsObject.nameValue = element.nameValue
    this.settingsObject.descriptionValue = element.descriptionValue
    this.settingsObject.wellboreValue = element.wellboreValue.map((val: any) => val.content);
    this.settingsObject.sectionValue = element.sectionValue.map((val: any) => val.content);
    this.settingsObject.operationsValue = element.operationsValue.map((val: any) => val.content);
    this.settingsObject.tubularValue = element.tubularValue.map((val: any) => val.content);
    this.settingsObject.tagsEntity = element.tagsEntity
    this.settingsObject.xAxisName = element.xAxisName
    this.settingsObject.yName = element.yName
    this.settingsObject.pieSizeValue = element.pieSizeValue
    this.settingsObject.valueColor = element.valueColor
    this.settingsObject.chartTypeValue = element.chartTypeValue.map((val: any) => val.content);

    this.nameValue = element.nameValue
    this.descriptionValue = element.descriptionValue
    this.wellboreValue = element.wellboreValue
    this.sectionValue = element.sectionValue
    this.operationsValue = element.operationsValue
    this.tubularValue = element.tubularValue
    this.tagsEntity = element.tagsEntity
    this.xAxisName = element.xAxisName
    this.xUnitValue = element.xUnitValue
    this.xMin = element.xMin
    this.xMax = element.xMax
    this.yName = element.yName
    this.yUnitValue = element.yUnitValue
    this.yMin = element.yMin
    this.yMax = element.yMax
    this.pieSizeValue = element.pieSizeValue
    this.valueColor = element.valueColor
    this.chartTypeValue = element.chartTypeValue
    this.legendState = element.legendState
    this.positionLegendValue = element.positionLegendValue
  })
}


settingsObject={
  nameValue:'',
  descriptionValue:'',
  wellboreValue:'',
  operationsValue:'',
  sectionValue:'',
  tubularValue:'',
 tagsEntity:'',
 chartTypeValue:'',
 xAxisName:'',
 yUnitValue:'',
 xMin:'',
 xMax:'',
 yName:'',
 xUnitValue:'',
 yMin:'',
 yMax:'',
 pieSizeValue:'',
 valueColor:'',
 legendState:'',
 positionLegendValue:'',
}
tagsEntity: any;



xAxisName: any;
xMin: any;
xMax: any;
yName: any;
yMin: any;
yMax: any;
legendState: any;

apply() {
  this.settingsObject = {
    nameValue: this.nameValue,
    descriptionValue: this.descriptionValue,
    wellboreValue: this.wellboreValue,
    operationsValue: this.operationsValue,
    sectionValue: this.sectionValue,
    tubularValue: this.tubularValue,
    tagsEntity: this.tagsEntity,
    chartTypeValue: this.chartTypeValue,
    xAxisName: this.xAxisName,
    yUnitValue: this.yUnitValue,
    xMin: this.xMin,
    xMax: this.xMax,
    yName: this.yName,
    xUnitValue: this.xUnitValue,
    yMin: this.yMin,
    yMax: this.yMax,
    pieSizeValue: this.pieSizeValue,
    valueColor: this.valueColor,
    legendState: this.legendState,
    positionLegendValue: this.positionLegendValue
  };
this.displaySettings=true
  this.dataService.setDataSettings(this.settingsObject);
}
displaySettings:boolean=false
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
