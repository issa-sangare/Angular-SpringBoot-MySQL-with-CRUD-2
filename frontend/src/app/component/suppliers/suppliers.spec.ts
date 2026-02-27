import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuppliersComponent } from './suppliers';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

describe('SuppliersComponent', () => {
  let component: SuppliersComponent;
  let fixture: ComponentFixture<SuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliersComponent],
      imports: [
        MatMenuModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initialise le template
    await fixture.whenStable();
  });

  it('should create ProductsComponent', () => {
    expect(component).toBeTruthy();
  });
});
