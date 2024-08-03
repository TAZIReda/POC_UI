import {
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

@Component({
  selector: 'app-table_poc_4',
  standalone: true,
  imports: [
    TableModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    PaginationModule,
    SearchModule,
  ],
  templateUrl: './table_poc_4.component.html',
  styleUrl: './table_poc_4.component.scss',
})
export class TablePoc4Component {
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
  ngOnInit() {
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
          Class: {
            displayedValue: 'Class A',
            savedValue: 1,
          },
        },
        {
          Title: 'Title 2',
          Description: 'Description 2',
          Class: {
            displayedValue: 'Class B',
            savedValue: 2,
          },
        },
        {
          Title: 'Title 3',
          Description: 'Description 3',
          Class: {
            displayedValue: 'Class C',
            savedValue: 3,
          },
        },
      ];

      this.model.insertTableRowsFromJson(myData);
    }
  }

  ngAfterViewInit(): void {
    // Now the templates are available
    this.model.data = this.model.data.map((row) => {
      row[3] = new TableItem({ template: this.statusesTemplate });
      row[4] = new TableItem({ template: this.actionsTemplate });
      return row;
    });
    this.cdr.detectChanges();
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
