import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoc4Component } from './table_poc_4.component';

describe('CrudComponent', () => {
  let component: TablePoc4Component;
  let fixture: ComponentFixture<TablePoc4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePoc4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePoc4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
