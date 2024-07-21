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
  selector: 'app-table_poc_2',
  standalone: true,
  imports: [
    TableModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    PaginationModule,
  ],
  templateUrl: './table_poc_2.component.html',
  styleUrl: './table_poc_2.component.scss',
})
export class TablePoc2Component {
  title = 'Table POC 2';
  size = 'md';
  showSelectionColumn = true;
  striped = false;
  sortable = true;
  isDataGrid = true;
  showFilter = true;
  stickyHeader = false;
  skeleton = false;
  model = new TableModel();
  enableSingleSelect = false;
  noData = false;
  allowExportSelectedData = true;
  exportEnabled = true;
  ariaLabelledby = 'This is a table POC 2';
  ariaDescribedby = 'This is a table POC 2';

  ngOnInit() {
    const myHeaders = [
      new TableHeaderItem({
        data: 'ID',
        dataType: 'string',
      }),
      new TableHeaderItem({
        data: 'Depth',
        dataType: 'number',
      }),
      new TableHeaderItem({
        data: 'Weight to weight',
        nestedHeaders: [
          new TableHeaderItem({
            data: 'Operation time',
            dataType: 'number',
          }),
          new TableHeaderItem({
            data: 'Date',
            nestedHeaders: [
              new TableHeaderItem({
                data: 'Start',
                dataType: 'date',
              }),
              new TableHeaderItem({
                data: 'End',
                dataType: 'date',
              }),
            ],
          }),
        ],
      }),
      new TableHeaderItem({
        data: 'On bottom to slips',
        nestedHeaders: [
          new TableHeaderItem({
            data: 'Operation time',
            dataType: 'number',
          }),
          new TableHeaderItem({
            data: 'Date',
            nestedHeaders: [
              new TableHeaderItem({
                data: 'Start',
                dataType: 'date',
              }),
              new TableHeaderItem({
                data: 'End',
                dataType: 'date',
              }),
            ],
          }),
        ],
      }),
      new TableHeaderItem({
        data: 'Slips to on bottom',
        nestedHeaders: [
          new TableHeaderItem({
            data: 'Operation time',
            dataType: 'number',
          }),
          new TableHeaderItem({
            data: 'Date',
            nestedHeaders: [
              new TableHeaderItem({
                data: 'Start',
                dataType: 'date',
              }),
              new TableHeaderItem({
                data: 'End',
                dataType: 'date',
              }),
            ],
          }),
        ],
      }),
    ];
    

    this.model.initializeHeaders(myHeaders);

    // this.model.assignLevels(this.model.header);
    // this.model.header = this.model.extractLastLevelHeaders(this.model.header);

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );

    if (!this.noData && !this.skeleton) {
      this.model.data = [
        [
          new TableItem({ data: 1 }), // ID
          new TableItem({ data: 52.52 }), // Depth
          new TableItem({ data: 4.00 }), // Operation time
          new TableItem({ data: '7/18/2024 0:00' }), // Weight to weight - Date - Start
          new TableItem({ data: '7/18/2024 4:00' }), // Weight to weight - Date - End
          new TableItem({ data: 3.00 }), // On bottom to slips - Operation time
          new TableItem({ data: '7/18/2024 5:00' }), // On bottom to slips - Date - Start
          new TableItem({ data: '7/18/2024 8:00' }), // On bottom to slips - Date - End
          new TableItem({ data: 2.00 }), // Slips to on bottom - Operation time
          new TableItem({ data: '7/18/2024 9:00' }), // Slips to on bottom - Date - Start
          new TableItem({ data: '7/18/2024 11:00' }), // Slips to on bottom - Date - End
        ],
        [
          new TableItem({ data: 2 }), // ID
          new TableItem({ data: 79.26 }), // Depth
          new TableItem({ data: 0.50 }), // Operation time
          new TableItem({ data: '7/18/2024 1:00' }), // Weight to weight - Date - Start
          new TableItem({ data: '7/18/2024 1:30' }), // Weight to weight - Date - End
          new TableItem({ data: 1.50 }), // On bottom to slips - Operation time
          new TableItem({ data: '7/18/2024 2:00' }), // On bottom to slips - Date - Start
          new TableItem({ data: '7/18/2024 3:30' }), // On bottom to slips - Date - End
          new TableItem({ data: 1.00 }), // Slips to on bottom - Operation time
          new TableItem({ data: '7/18/2024 4:00' }), // Slips to on bottom - Date - Start
          new TableItem({ data: '7/18/2024 5:00' }), // Slips to on bottom - Date - End
        ],
        [
          new TableItem({ data: 3 }), // ID
          new TableItem({ data: 65.40 }), // Depth
          new TableItem({ data: 3.00 }), // Operation time
          new TableItem({ data: '7/19/2024 8:00' }), // Weight to weight - Date - Start
          new TableItem({ data: '7/19/2024 11:00' }), // Weight to weight - Date - End
          new TableItem({ data: 2.50 }), // On bottom to slips - Operation time
          new TableItem({ data: '7/19/2024 12:00' }), // On bottom to slips - Date - Start
          new TableItem({ data: '7/19/2024 14:30' }), // On bottom to slips - Date - End
          new TableItem({ data: 1.50 }), // Slips to on bottom - Operation time
          new TableItem({ data: '7/19/2024 15:00' }), // Slips to on bottom - Date - Start
          new TableItem({ data: '7/19/2024 16:30' }), // Slips to on bottom - Date - End
        ],
        [
          new TableItem({ data: 4 }), // ID
          new TableItem({ data: 85.70 }), // Depth
          new TableItem({ data: 5.00 }), // Operation time
          new TableItem({ data: '7/20/2024 6:00' }), // Weight to weight - Date - Start
          new TableItem({ data: '7/20/2024 11:00' }), // Weight to weight - Date - End
          new TableItem({ data: 4.00 }), // On bottom to slips - Operation time
          new TableItem({ data: '7/20/2024 12:00' }), // On bottom to slips - Date - Start
          new TableItem({ data: '7/20/2024 16:00' }), // On bottom to slips - Date - End
          new TableItem({ data: 3.00 }), // Slips to on bottom - Operation time
          new TableItem({ data: '7/20/2024 17:00' }), // Slips to on bottom - Date - Start
          new TableItem({ data: '7/20/2024 20:00' }), // Slips to on bottom - Date - End
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
