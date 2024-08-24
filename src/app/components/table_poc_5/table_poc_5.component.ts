import { DataSource, CustomStore } from 'data-lib';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  TableItem,
  TableModel,
  TableModule,
  DialogModule,
  NFormsModule,
  ModalModule,
  PaginationModule,
} from 'ui-components-lib';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { PaginationProperties } from 'ui-components-lib/lib/components/table/table.component';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Use the imported functions/variables as needed

@Component({
  selector: 'app-table_poc_5',
  standalone: true,
  imports: [
    TableModule,
    HeaderContentComponent,
    DialogModule,
    NFormsModule,
    ModalModule,
    PaginationModule,
  ],
  templateUrl: './table_poc_5.component.html',
  styleUrl: './table_poc_5.component.scss',
})
export class TablePoc5Component {
  size = 'md';
  showSelectionColumn = true;
  striped = false;
  noData = false;
  sortable = true;
  isDataGrid = true;
  showFilter = true;
  allowAdding = true;
  allowUpdating = true;
  allowDeleting = true;
  stickyHeader = false;
  skeleton = false;
  allowExportSelectedData = true;
  exportEnabled = true;
  model = new TableModel();

  enablePagination = true;
  paginationProperties: PaginationProperties = {
    pageLength: 10,
  };

  filter1 = '';

  constructor(
    private httpClient: HttpClient,
  ) {}

  dataSource: DataSource;

  title = 'Table POC 5';
  @ViewChild('filter') filter: TemplateRef<any>;
  @ViewChild('filterableHeaderTemplate')
  protected filterableHeaderTemplate: TemplateRef<any>;
  @ViewChild('paginationTableItemTemplate')
  protected paginationTableItemTemplate: TemplateRef<any>;

  async ngOnInit() {
    const SERVICE_URL = 'https://jsonplaceholder.typicode.com/posts';
    const customStore = new CustomStore({
      // these are example of crud operations that can be done on the model using custom store

      load: (loadOptions: any = {}) => {
        let basicUrl = SERVICE_URL;
        if(Object.keys(loadOptions).length === 0) {
          return lastValueFrom(this.httpClient.get(basicUrl));
        }
        if (loadOptions.remoteOperations?.paging && loadOptions.params) {
          const page = loadOptions.params.pagination?.pageIndex;
          const pageSize = loadOptions.params.pagination?.pageSize || 10;
          basicUrl += `?_page=${page}&_limit=${pageSize}`;
        }
        console.log(basicUrl);
        if (
          loadOptions.remoteOperations?.filtering &&
          loadOptions.params &&
          loadOptions.params.filtering?.filters.length > 0
        ) {
          //construct filter from filter object and add it to the url
          const filters = loadOptions.params.filtering?.filters;

          // usage example of filters list:
          // construct a concatinated string from the filterObject ( this is needs to be a custom function that will do the concatination )
          let filterString = '';
          for (let filter of filters) {
            if (filter.filterData.operation == 'reset') continue;
            if (filter.filterData.data && filter.filterData.operation) {
              filterString += `${filter.headerName}=${filter.filterData.data}`;
              basicUrl += `&${filterString}`;
            }
          }
          console.log(basicUrl);
        }

        return lastValueFrom(this.httpClient.get(basicUrl));
      },
      byKey: async (key: any) => {
        return await lastValueFrom(
          this.httpClient.get(SERVICE_URL + '/' + encodeURIComponent(key))
        );
      },

      insert: (values: any) => {
        return lastValueFrom(this.httpClient.post(SERVICE_URL, values));
      },

      update: (values: any) => {
        // extract key from values
        // in our case the key is the 'id' field
        let key = values.id;
        return lastValueFrom(
          this.httpClient.put(SERVICE_URL + "/" + encodeURIComponent(key), values)
        );
      },

      remove: (values: any) => {
        // extract key from values
        // in our case the key is the 'id' field
        let key = values.id;
        return lastValueFrom(this.httpClient.delete(`${SERVICE_URL}/${key}`));
      },
    });
    this.dataSource = new DataSource(customStore);

    this.model.rowsSelectedChange.subscribe((event) => console.log(event));
    this.model.selectAllChange.subscribe((event) =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!')
    );

    if (!this.noData && !this.skeleton) {
      this.model.dataSource = this.dataSource;
      this.model.customStore
        .load()
        .then((data: any) => {
          // create rows TableItem[][] from JSON data
          this.model.insertTableRowsFromJson(data);
          // fill out header if not provided from this.model.header
          this.model.initializeHeadersFromJson(data);
        })
        .catch((error: any) => {
          console.log(error, 'error');
        });
    }
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }

  onRowInserted(rowData: TableItem[]) {
    console.log('Row inserted successfully!', rowData);
  }

  onRowUpdated(rowData: TableItem[]) {
    console.log('Row updated successfully!', rowData);
  }

  onRowDeleted(rowIndex: number) {
    console.log('Row deleted successfully!', rowIndex);
  }
}
