import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoc6Component } from './table_poc_6.component';

describe('CrudComponent', () => {
  let component: TablePoc6Component;
  let fixture: ComponentFixture<TablePoc6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePoc6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePoc6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
