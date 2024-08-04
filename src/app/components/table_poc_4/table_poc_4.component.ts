import {
  AfterViewInit,
  ChangeDetectorRef,
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
  SearchModule,
} from 'ui-components-lib';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table_poc_4',
  standalone: true,
  imports: [
    TableModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    CommonModule,
    ModalModule,
    PaginationModule,
    SearchModule,
  ],
  templateUrl: './table_poc_4.component.html',
  styleUrl: './table_poc_4.component.scss',
})
export class TablePoc4Component implements AfterViewInit {
  title = 'Table POC 4';
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
  ariaLabelledby = 'This is a table POC 4';
  ariaDescribedby = 'This is a table POC 4';

  batchText = {
    SINGLE: '1 item selected',
    MULTIPLE: '{{count}} items selected',
  };

  enableSearch = true;
  searchProperties = {
    expandable: false,
  };

  @ViewChild('statusesTemplate')
  statusesTemplate: TemplateRef<any>[] | undefined;

  @ViewChild('actionsTemplate')
  actionsTemplate: TemplateRef<any>[] | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Now the templates are available
    const myHeaders = [
      new TableHeaderItem({
        data: 'Title',
        dataType: 'string',
      }),
      new TableHeaderItem({
        data: 'Description',
        dataType: 'string',
      }),
      new TableHeaderItem({
        data: 'Day',
        dataType: 'date',
      }),
      new TableHeaderItem({
        data: 'Class',
        dataType: 'lookup',
        lookupDetails: {
          dataSource: [
            { id: 1, name: 'Class A' },
            { id: 2, name: 'Class B' },
            { id: 3, name: 'Class C' },
          ],
          displayExpr: 'name',
          valueExpr: 'id',
        },
      }),
      new TableHeaderItem({
        data: 'Status',
        dataType: 'string',
      }),
      new TableHeaderItem({
        data: 'Actions',
        dataType: 'string',
      }),
    ];

    this.model.initializeHeaders(myHeaders);

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );

    if (!this.noData && !this.skeleton) {
      const myData = [
        {
          Title: 'Title 1',
          Description: 'Description 1',
          Day: new Date('2021-01-01'),
          Class: {
            displayedValue: 'Class A',
            savedValue: 1,
          },
        },
        {
          Title: 'Title 2',
          Description: 'Description 2',
          Day: new Date('2021-02-01'),
          Class: {
            displayedValue: 'Class B',
            savedValue: 2,
          },
        },
        {
          Title: 'Title 3',
          Description: 'Description 3',
          Day: new Date('2021-01-01'),
          Class: {
            displayedValue: 'Class C',
            savedValue: 3,
          },
        },
        {
          Title: 'Title 4',
          Description: 'Description 2',
          Day: new Date('2021-02-02'),
          Class: {
            displayedValue: 'Class A',
            savedValue: 1,
          },
        },
        {
          Title: 'Title 5',
          Description: 'Description 1',
          Day: new Date('2021-03-01'),
          Class: {
            displayedValue: 'Class C',
            savedValue: 3,
          },
        },
        {
          Title: 'Title 4',
          Description: 'Description 3',
          Day: new Date('2021-02-02'),
          Class: {
            displayedValue: 'Class A',
            savedValue: 1,
          },
        },
        {
          Title: 'Title 2',
          Description: 'Description 3',
          Day: new Date('2021-03-04'),
          Class: {
            displayedValue: 'Class B',
            savedValue: 2,
          },
        },
      ];
      const newData = this.model.jsonDataTotableModel(myData);
      const finalRows = newData.map((row, index) => {
        row[4] = new TableItem({
          data: {
            status: 'inactive',
            id: index,
          },
          template: this.statusesTemplate,
        });
        row[5] = new TableItem({
          data: {
            status: 'inactive',
            id: index,
          },
          template: this.actionsTemplate,
        });
        return row;
      });
      this.model.insertTableRowsGroupedByColumn(finalRows, 'Day');
      this.cdr.detectChanges();
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

  start(data: any) {
    console.log(data);
    this.model.data.forEach((row: any) => {
      row[0].expandedData.forEach((item: TableItem[], index: number) => {
        if (item[4].data.id === data.id) {
          item[4].data.status = 'running';
          item[5].data.status = 'running';
        }
      });
    });
    this.cdr.detectChanges();
  }

  stop(data: any) {
    this.model.data.forEach((row: any) => {
      row[0].expandedData.forEach((item: TableItem[], index: number) => {
        if (item[4].data.id === data.id) {
          item[4].data.status = 'inactive';
          item[5].data.status = 'inactive';
        }
      });
    });
    this.cdr.detectChanges();
  }

  complete(data: any) {
    this.model.data.forEach((row: any) => {
      row[0].expandedData.forEach((item: TableItem[], index: number) => {
        if (item[4].data.id === data.id) {
          item[4].data.status = 'completed';
          item[5].data.status = 'completed';
        }
      });
    });
    this.cdr.detectChanges();
  }

  expandAllRows(event: boolean) {
    this.model.rowsExpanded = new Array<boolean>(this.model.data.length).fill(event);
  }
}
