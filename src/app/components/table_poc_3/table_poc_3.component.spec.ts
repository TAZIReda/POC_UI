import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoc3Component } from './table_poc_3.component';

describe('CrudComponent', () => {
  let component: TablePoc3Component;
  let fixture: ComponentFixture<TablePoc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePoc3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePoc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
