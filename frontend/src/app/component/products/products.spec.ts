import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        MatMenuModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initialise le template
    await fixture.whenStable();
  });

  it('should create ProductsComponent', () => {
    expect(component).toBeTruthy();
  });
});
