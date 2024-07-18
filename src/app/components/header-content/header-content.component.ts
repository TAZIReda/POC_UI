import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PanelModule,
  SideNavModule,
  HeaderModule,
  BreadcrumbModule,
  Breadcrumb
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
  @Input() title:string;
  @Input() breadcrumps:any [];
  active = true;
  action =false;
  headerItems=[];
  // breadrums:Breadcrumb[]
}
