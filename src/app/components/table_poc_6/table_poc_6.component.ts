import {
  Component,
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
  selector: 'app-table_poc_6',
  standalone: true,
  imports: [
    TableModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    PaginationModule,
  ],
  templateUrl: './table_poc_6.component.html',
  styleUrl: './table_poc_6.component.scss',
})
export class TablePoc6Component {
  title = 'Table POC 6';
  size = 'md';
  showSelectionColumn = true;
  striped = false;
  sortable = true;
  isDataGrid = true;
  stickyHeader = false;
  skeleton = false;
  model = new TableModel();
  enableSingleSelect = false;
  showFilter = false;
  noData = false;
  ariaLabelledby = 'This is a table POC 6';
  ariaDescribedby = 'This is a table POC 6';

allowUpdating: boolean = true;
allowAdding: boolean = true;
allowDeleting: boolean = true;

  ngOnInit() {
    const myHeaders = [
      new TableHeaderItem({
        data: 'String',
        dataType: 'string',
        title: 'Table header title',
        dataSummaryType: 'count',
        validator: {
          type: 'string',
          required: true,
          pattern: '^[a-zA-Z]+$',
          value: 'B',
          operator: 'contains',
          message: 'required, must contain B and only letters',
        },
      }),
      new TableHeaderItem({
        data: 'Number',
        dataType: 'number',
        className: 'my-class',
        dataSummaryType: 'sum',
        validator: {
          type: 'number',
          operator: '>',
          value: 10,
          message: 'Number must be greater than 10',
        },
      }),
      new TableHeaderItem({
        data: 'Date',
        dataType: 'date',
        className: 'my-class',
        dataSummaryType: 'max',
        validator: {
          type: 'date',
          required: true,
          operator: '>',
          value: new Date('07-11-2024'), // mm/dd/yyyy
          message: 'Date is required and greater than 11 july 2024',
        },
      }),
      new TableHeaderItem({
        data: 'Boolean',
        dataType: 'boolean',
        className: 'my-class',
        dataSummaryType: 'count',
      }),
    ];

    this.model.initializeHeaders(myHeaders);

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );

    if (!this.noData && !this.skeleton) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortable']) {
      for (let column of this.model.header) {
        column.sortable = changes['sortable'].currentValue;
      }
    }
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }
}
