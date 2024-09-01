import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocTestComponentComponent } from './poc-test-component.component';

describe('PocTestComponentComponent', () => {
  let component: PocTestComponentComponent;
  let fixture: ComponentFixture<PocTestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocTestComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PocTestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
