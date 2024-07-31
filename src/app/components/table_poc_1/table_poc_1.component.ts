import {
  Component,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  TableHeaderItem,
  TableItem,
  TableModel,
  TableModule,
  DialogModule,
  NFormsModule,
  ModalModule,
  PaginationModule,
} from 'ui-components-lib';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PaginationProperties } from 'ui-components-lib/lib/components/table/table.component';
import * as json from '../../data.json';

@Component({
  selector: 'app-table_poc_1',
  standalone: true,
  imports: [
    TableModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    PaginationModule,
  ],
  templateUrl: './table_poc_1.component.html',
  styleUrl: './table_poc_1.component.scss',
})
export class TablePoc1Component implements OnChanges {
  size = 'md';
  showSelectionColumn = true;
  striped = false;
  sortable = true;
  isDataGrid = true;
  showFilter = true;
  stickyHeader = false;
  skeleton = false;
  model = new TableModel();

  enablePagination = true;
  paginationProperties: PaginationProperties = {
    pageLength: 7,
  };

  filter1 = '';

  constructor(private dataService: DataService) {}

  title = 'Table POC 1';
  @ViewChild('filter') filter: TemplateRef<any>;
  @ViewChild('filterableHeaderTemplate')
  protected filterableHeaderTemplate: TemplateRef<any>;
  @ViewChild('paginationTableItemTemplate')
  protected paginationTableItemTemplate: TemplateRef<any>;

  async ngOnInit() {
    const myHeaders = [
      new TableHeaderItem({
        data: 'Time',
        dataType: 'date',
      }),
      new TableHeaderItem({
        data: 'TVA',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'TQA',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'RPM',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'TID',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'DMEA',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'DBTM',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'ROP',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'HKLD',
        dataType: 'number',
      }),
    ];

    this.model.initializeHeaders(myHeaders);
    
    //TODO: check async call because the lib is working with customStore, so normal api calls will cause a problem
    const jsonData = json['real-time-data'].map((element: Record<string, any>) => {
      delete element['id'];
      return element;
    });
    this.model.insertTableRowsFromJson(jsonData);

    this.paginationProperties.totalDataLength = this.model.data.length;

    // add real time data each 3 seconds
    let tva = 10;
    let tqa = 20;
    let rpm = 5000;
    let tid = 1234;
    let dmea = 50;
    let dbtm = 30;
    let rpo = 100;
    let hkld = 5;
    // if (this.model.header.length > 0) {
    //   setInterval(async () => {
    //     console.log('setInterval');
    //     tva++;
    //     tqa++;
    //     rpm++;
    //     tid++;
    //     dmea++;
    //     dbtm++;
    //     rpo++;
    //     hkld++;
    //     const dummyData = {
    //       time: '2024-07-30T23:00:00.000Z',
    //       tva: tva,
    //       tqa: tqa,
    //       rpm: rpm,
    //       tid: tid,
    //       dmea: dmea,
    //       dbtm: dbtm,
    //       rpo: rpo,
    //       hkld: hkld,
    //     };
    //     this.dataService.setRealTimeData(dummyData);
    //     const { data, totalDataLength } =
    //       await this.dataService.getRealTimeData(
    //         this.model.currentPage,
    //         this.model.pageLength
    //       );

    //     const newData = this.model.jsonDataTotableModel(data);

    //     this.model.totalDataLength = totalDataLength;
    //     // this.paginationProperties.totalDataLength = totalDataLength;
    //     this.model.data = newData;

    //     console.log(data, totalDataLength);
    //   }, 3000);
    // }
    // this.paginationProperties.pageLength = 10;
    // this.paginationProperties.totalDataLength = this.model.data.length;
    // this.model.totalDataLength = this.paginationProperties.totalDataLength;

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // when get data from server
    if (changes['data']) {
      this.model.data = changes['data'].currentValue;
    }
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }
}
