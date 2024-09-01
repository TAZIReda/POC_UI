import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoc5Component } from './table_poc_5.component';

describe('CrudComponent', () => {
  let component: TablePoc5Component;
  let fixture: ComponentFixture<TablePoc5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePoc5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePoc5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
