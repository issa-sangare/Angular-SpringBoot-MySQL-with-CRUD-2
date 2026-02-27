import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierComponent } from './view-supplier';

describe('ViewSupplierComponent', () => {
  let component: ViewSupplierComponent;
  let fixture: ComponentFixture<ViewSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSupplierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSupplierComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
