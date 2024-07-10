import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PanelModule,
  SideNavModule,
  HeaderModule,
  BreadcrumbModule
} from 'ui-components-lib';
@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [ PanelModule,
    SideNavModule,
    HeaderModule,
    BreadcrumbModule,
    CommonModule
  ],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.scss'
})
export class HeaderContentComponent {
  active = true;
  action =false;
  headerItems=[];
  title='CRUD Operations'
}
