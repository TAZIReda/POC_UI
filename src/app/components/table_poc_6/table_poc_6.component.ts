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
  IconModule,
} from 'ui-components-lib';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table_poc_6',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    PaginationModule,
    IconModule,
  ],
  templateUrl: './table_poc_6.component.html',
  styleUrl: './table_poc_6.component.scss',
})
export class TablePoc6Component {
  title = 'Table POC 6';
  size = 'md';
  showSelectionColumn = false;
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

  enableSearch = true;
  searchProperties = {
    expandable: false,
  };
  batchText = {
    SINGLE: '1 item selected',
    MULTIPLE: '{{count}} items selected',
  };
  offset = {
    x: -9,
    y: 0,
  } as { x: number; y: number };

  items: { content: string; selected: boolean }[] = [];
  staticLookupData = [
    { id: 1, name: 'Algeria' },
    { id: 2, name: 'Tunisia' },
    { id: 3, name: 'Morocco' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.items = this.staticLookupData.map((item) => {
      return {
        content: item.name,
        selected: false,
      };
    });
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
      new TableHeaderItem({
        data: 'Country',
        dataType: 'lookup',
        lookupDetails: {
          dataSource: this.staticLookupData,
          displayExpr: 'name',
          valueExpr: 'id',
        },
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
          new TableItem({
            data: {
              displayedValue: 'Tunisia',
              savedValue: 2,
            },
          }),
        ],
        [
          new TableItem({ data: 'Name 3' }),
          new TableItem({ data: 1323 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: false }),
          new TableItem({
            data: {
              displayedValue: 'Morocco',
              savedValue: 3,
            },
          }),
        ],
        [
          new TableItem({ data: 'Name 2' }),
          new TableItem({ data: 9432 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: true }),
          new TableItem({
            data: {
              displayedValue: 'Algeria',
              savedValue: 1,
            },
          }),
        ],
        [
          new TableItem({ data: 'Name 4' }),
          new TableItem({ data: 4939 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: false }),
          new TableItem({
            data: {
              displayedValue: 'Tunisia',
              savedValue: 2,
            },
          }),
        ],
        [
          new TableItem({ data: 'Name 5' }),
          new TableItem({ data: 0 }),
          new TableItem({ data: new Date() }),
          new TableItem({ data: true }),
          new TableItem({
            data: {
              displayedValue: 'Morocco',
              savedValue: 3,
            },
          }),
        ],
        [
          new TableItem({ data: 'Name 6' }),
          new TableItem({ data: 20 }),
          // formatDate is a function that formats the date in a specific way
          new TableItem({ data: new Date('05/15/2024') }),
          new TableItem({ data: false }),
          new TableItem({
            data: {
              displayedValue: 'Algeria',
              savedValue: 1,
            },
          }),
        ],
        [
          new TableItem({ data: 'Name 7' }),
          new TableItem({ data: 1 }),
          new TableItem({ data: new Date('01/15/2024') }),
          //you can call this.formatDate(...) for display
          new TableItem({ data: true }),
          new TableItem({
            data: {
              displayedValue: 'Tunisia',
              savedValue: 2,
            },
          }),
        ],
      ];
    }
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortable']) {
      for (let column of this.model.header) {
        column.sortable = changes['sortable'].currentValue;
      }
    }

    this.cdr.detectChanges();
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }

  cancelMethod() {
    console.log('Cancel button clicked');
  }

  onChange(event) {
    // global search on this.model.data with the search event value
    let areRowsExpanded = false;
    this.model.header.forEach((header) => {
      if (header.groupBy) {
        areRowsExpanded = true;
      }
    });

    if (areRowsExpanded) {
      this.model.data = this.model.dataset.reduce((acc, row) => {
        // Filter the expandedData
        let filteredExpandedData = row[0].expandedData.filter((expandedRow) => {
          return expandedRow.some((cell) => {
            if (typeof cell.data !== 'object') {
              return cell.data
                ?.toString()
                .toLowerCase()
                .includes(event.toLowerCase());
            } else {
              return cell.data.displayedValue
                ?.toString()
                .toLowerCase()
                .includes(event.toLowerCase());
            }
          });
        });

        // Only include this row if there's matching expandedData
        if (filteredExpandedData.length > 0) {
          // Create a new row array
          let newRow = [
            // Create a new object for the first element, copying only necessary properties
            new TableItem({
              ...Object.keys(row[0]).reduce((obj, key) => {
                if (key !== 'expandedData') {
                  obj[key] = row[0][key];
                }
                return obj;
              }, {}),
              expandedData: filteredExpandedData,
            }),
            // Copy the rest of the row elements as is
            ...row.slice(1),
          ];

          acc.push(newRow);
        }

        return acc;
      }, [] as TableItem[][]);
    } else {
      this.model.data = this.model?.dataset.filter((row) => {
        return Object.values(row).some((value) => {
          if (typeof value.data !== 'object') {
            return value.data
              ?.toString()
              .toLowerCase()
              .includes(event.toLowerCase());
          } else {
            return value.data.displayedValue
              ?.toString()
              .toLowerCase()
              .includes(event.toLowerCase());
          }
        });
      });
    }
  }

  onSelectedColumnsChange(event) {
    if (!event.some((country) => country.selected)) {
      this.model.data = this.model.dataset;
      return;
    }
    console.log('Selected columns:', event);
    const selectedCountries = event.map((country) => country.content);
    console.log('Selected countries:', selectedCountries);
    console.log(this.model.dataset);
    this.model.data = this.model.dataset.filter((row) => {
      console.log(row[4].data.displayedValue);
      return selectedCountries.includes(row[4].data.displayedValue);
    });
  }

  changeBoolean(event) {
    console.log('Boolean changed:', event);
    this.model.data = this.model.dataset.filter((row) => {
      return row[3].data === event;
    });
  }

  logDates() {
    const dates = this.model.dataset.map((row) => {
      return row[2].data;
    });
    console.log('Dates:', dates);
  }
}
