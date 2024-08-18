import { DataSource, CustomStore } from 'data-lib';
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
import { DataService } from '../../data.service';
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
export class TablePoc5Component implements OnChanges {
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
    pageLength: 7,
  };

  filter1 = '';

  constructor(private dataService: DataService, private httpClient : HttpClient) {}

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
      load: (loadOptions: any) => {
        return lastValueFrom(this.httpClient.get(SERVICE_URL));
      },

      byKey: async (key: any) => {
        return await lastValueFrom(
          this.httpClient.get(SERVICE_URL + '/' + encodeURIComponent(key))
        );
      },

      insert: async (values: any) => {
        const row: any = await lastValueFrom(
          this.httpClient.post(SERVICE_URL, values)
        );
        var newRow : TableItem[] = [];
        for (let key in row) {
          newRow.push(new TableItem({ data: row[key]  }));
        }
        //add the row to the model
        this.model.addRow(newRow);
      },

      update: async (key: any, values: any) => {
        return await lastValueFrom(
          this.httpClient.put(SERVICE_URL + encodeURIComponent(key), values)
        );
      },

      remove: async (key: any) => {
        console.log(key);
        const removed = await lastValueFrom(
          this.httpClient.delete(`${SERVICE_URL}/${key}`)
        );

        if (removed) {
          this.model.deleteRow(key);
        }
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
