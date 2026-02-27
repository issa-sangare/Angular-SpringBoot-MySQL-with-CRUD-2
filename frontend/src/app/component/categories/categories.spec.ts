import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [
        MatMenuModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initialise le template
    await fixture.whenStable();
  });

  it('should create CategoriesComponent', () => {
    expect(component).toBeTruthy();
  });
});
