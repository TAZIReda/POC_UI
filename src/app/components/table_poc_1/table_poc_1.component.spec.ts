import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoc1Component } from './table_poc_1.component';

describe('CrudComponent', () => {
  let component: TablePoc1Component;
  let fixture: ComponentFixture<TablePoc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePoc1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePoc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
