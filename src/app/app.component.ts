import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  PanelModule,
  SideNavModule,
  HeaderModule,
  TableModule,
  TableModel,
  TableHeaderItem,
  TableItem
} from 'ui-components-lib';
import { HeaderContentComponent } from "./components/header-content/header-content.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        PanelModule,
        HeaderModule,
        SideNavModule,
        HeaderContentComponent,
        TableModule,
        HttpClientModule
    ]
})
export class AppComponent {
  title = 'POC_UI';

}
