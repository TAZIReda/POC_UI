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
  showFilter = false;
  stickyHeader = false;
  skeleton = false;
  model = new TableModel();

  filter1 = '';

  constructor(private dataService: DataService) {}

  title = 'Table POC 1';
  get totalDataLength() {
    return this.model.totalDataLength;
  }
  set totalDataLength(value) {
    this.model.totalDataLength = value;
  }

  @ViewChild('filter') filter: TemplateRef<any>;
  @ViewChild('filterableHeaderTemplate')
  protected filterableHeaderTemplate: TemplateRef<any>;
  @ViewChild('paginationTableItemTemplate')
  protected paginationTableItemTemplate: TemplateRef<any>;

  ngOnInit() {
    this.model.data = [[]];
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

    this.model.pageLength = 10;
    this.selectPage(1);


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

    //     const { newData } = this.model.jsonDataTotableModel(data);

    //     this.model.totalDataLength = totalDataLength;
    //     this.model.data = newData;

    //     console.log(data, totalDataLength);
    //   }, 3000);
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // when get data from server
    if (changes['data']) {
      this.model.data = changes['data'].currentValue;
    }
  }

  customSort(index: number) {
    this.sort(this.model, index);
  }

  sort(model: TableModel, index: number) {
    if (model.header[index].sorted) {
      // if already sorted flip sorting direction
      model.header[index].ascending = model.header[index].descending;
    }
    model.sort(index);
  }

  async selectPage(page: any) {
    this.model.currentPage = page;
    const { data, totalDataLength } = await this.dataService.getRealTimeData(
      this.model.currentPage,
      this.model.pageLength
    );

    const { newData } = this.model.jsonDataTotableModel(data);

    this.model.totalDataLength = totalDataLength;
    this.model.data = newData;
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }
}
