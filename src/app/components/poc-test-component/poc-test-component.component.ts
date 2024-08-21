import { Component, ViewContainerRef } from '@angular/core';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { ButtonModule, ContainedListModule, ContentSwitcherModule, ContentSwitcherOption, IconModule, InputModule, NotificationService, StructuredListModule, TagModule } from 'ui-components-lib';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-poc-test-component',
  standalone: true,
  imports: [
    HeaderContentComponent,
    TagModule,
    InputModule,
	IconModule,
    ButtonModule,
	ContentSwitcherModule,
	ContainedListModule,
	StructuredListModule,
	CommonModule
  ],
  templateUrl: './poc-test-component.component.html',
  styleUrl: './poc-test-component.component.scss'
})
export class PocTestComponentComponent {


	constructor(private router: Router,
		 private dataService:DataService  ,  private viewContainer: ViewContainerRef,
		){}

		

users:any=[]

  breadcrumps=[{
    content:'Users',
    href:'users'
  },{
    content:'OtherComponents',
  },
  ]
  buttonNgClass: {
	"example-global-class": true
}
  availableItems:any=[ 
		{
			content: "Reda",
			type:'red'
		},
		{
			content: "Mohamed",
		},
		{
			content: "Riad",
			type:'cyan'
		}
	]
tags: any;
details:any=[];
UsersDetails=[{
	content:"Reda",
	job:"Full stack developer",
	desc:"Computer engineer passionate about development"
},{
	content:"Mohamed",
	job:"Mechanic",
	desc:"car mechanic passionate about engine and race"
},{
	content:"Riad",
	job:"CEO",
	desc:"Experienced CEO with strong expertise in strategic leadership"
},]

onClick($event: any) {
	this.users=$event
}

ItemClick(_t24: any) {
	let userDetail:any = this.UsersDetails.find((user) => user.content === _t24.text);
	if (!this.details.some((detail:any) => detail.content === userDetail.content)) {
		this.details.push(userDetail);
	  }
}
refresh() {
this.users=[];
this.details=[];
}
onDelete(userA: any) {
this.users = this.users.filter((user: any) => user.text !== userA.text);
this.details = this.details.filter((user: any) => user.content !== userA.text);
}

}
