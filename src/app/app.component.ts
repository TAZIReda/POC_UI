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
theme: any;
expanded($event: MouseEvent) {
this.active=! this.active
}
  title = 'POC_UI';

  active = true;
  simpleModel: TableModel;
  constructor() {
    this.simpleModel = new TableModel();
  }
  model = new TableModel();

  headerItems=[];

  ngOnInit() {
    const myHeaders = [
      new TableHeaderItem({
        data: 'String',
        dataType: 'string',
        title: 'Table header title',
      }),
      new TableHeaderItem({
        data: 'Number',
        dataType: 'number',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Date',
        dataType: 'date',
        className: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Boolean',
        dataType: 'boolean',
        className: 'my-class',
      }),
    ];

    this.model.initializeHeaders(myHeaders)

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );

   
      this.model.data = [
        [
          new TableItem({ data: 'Name 1', title: 'Table item title' }),
          new TableItem({ data: 21 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: true }),
        ],
        [
          new TableItem({ data: 'Name 3' }),
          new TableItem({ data: 1323 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: false }),
        ],
        [
          new TableItem({ data: 'Name 2' }),
          new TableItem({ data: 9432 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: true }),
        ],
        [
          new TableItem({ data: 'Name 4' }),
          new TableItem({ data: 4939 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: false }),
        ],
        [
          new TableItem({ data: 'Name 5' }),
          new TableItem({ data: 0 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: true }),
        ],
        [
          new TableItem({ data: 'Name 6' }),
          new TableItem({ data: 20 }),
          // formatDate is a function that formats the date in a specific way
          new TableItem({ data: new Date('05/15/2024') }),
          new TableItem({ data: false }),
        ],
        [
          new TableItem({ data: 'Name 7' }),
          new TableItem({ data: 1 }),
          new TableItem({ data: new Date('01/15/2024') }),
          //you can call this.formatDate(...) for display
          new TableItem({ data: true }),
        ],
      ];
   
  }

}
