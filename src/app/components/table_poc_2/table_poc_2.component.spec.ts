import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoc2Component } from './table_poc_2.component';

describe('CrudComponent', () => {
  let component: TablePoc2Component;
  let fixture: ComponentFixture<TablePoc2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePoc2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePoc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
