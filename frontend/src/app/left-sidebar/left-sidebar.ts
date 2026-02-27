import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css',
})
export class LeftSidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'dashboard',
      icon: 'fas fa-home',
      label: 'Dashboard',
    },
    {
      routeLink: 'products',
      icon: 'fas fa-box-open',
      label: 'Produits',
    },
    {
      routeLink: 'categories',
      icon: 'fas fa-layer-group',
      label: 'Catégories',
    },
    {
      routeLink: 'suppliers',
      icon: 'fas fa-truck',
      label: 'Fournisseurs',
    },
    {
      routeLink: 'employees',
      icon: 'fas fa-users',
      label: 'Employés',
    },
    {
      routeLink: 'settings',
      icon: 'fas fa-cog',
      label: 'Réglages',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
