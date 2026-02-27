import { Routes } from '@angular/router';
import { ProductsComponent } from './component/products/products';
import { CategoriesComponent } from './component/categories/categories';
import {SuppliersComponent} from './component/suppliers/suppliers';
import {EmployeesComponent} from './component/employees/employees';
import {SettingsComponent} from './settings/settings';
import {DashboardComponent} from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'settings', component: SettingsComponent }
];
