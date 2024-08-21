import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  PanelModule,
  SideNavModule,
  HeaderModule,
  TableModule,
  TableModel,
  TableHeaderItem,
  TableItem,
  NotificationService,
  NotificationModule
} from 'ui-components-lib';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    PanelModule,
    HeaderModule,
    SideNavModule,
    HeaderContentComponent,
    TableModule,
    HttpClientModule,
    NotificationModule,
    CommonModule
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  notificationObject: any;
  dataS: any;
 
  constructor(
    
    private viewContainer: ViewContainerRef,
    private dataService:DataService
  ){}



  active = true;

  expanded($event: MouseEvent) {
    this.active=! this.active
    }
}
