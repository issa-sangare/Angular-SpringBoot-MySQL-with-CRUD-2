import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AddProductComponent} from '../add-product/add-product';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../model/Category';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {CategoriesService} from '../../service/categories';
import {ViewCategoryComponent} from '../view-category/view-category';
import {AddCategoryComponent} from '../add-category/add-category';

@Component({
  selector: 'app-categories',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatIcon,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    MatIconButton
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoryList: Category[] = [];
  dataSource = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['name', 'description', 'action'];
  subscription: Subscription = new Subscription();

  constructor(private dialog : MatDialog, private service: CategoriesService, private toastr: ToastrService) {
  }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.GetAllCategories();
  }

  GetAllCategories(): void {
    let sub = this.service.getCategories().subscribe((item: Category[]) => {
      this.categoryList = item;
      this.dataSource.data = this.categoryList;   // 👈 IMPORTANT
    });

    this.subscription.add(sub);
  }

  addCategory() {
    this.openPopup(0);
  }

  ReadCategory(code: number) {
    this.dialog.open(ViewCategoryComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { code: code }
    });
  }

  EditCategory(categoryId: number) {
    this.openPopup(categoryId);
  }

  openPopup(categoryId: number) {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        'code': categoryId
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.GetAllCategories();
    });
  }

  DeleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete this Category?')) {
      const sub = this.service.deleteCategory(categoryId).subscribe({
        next: (res) => {
          this.GetAllCategories();  // rafraîchit la liste
          this.toastr.success(res || 'Saved successfully', 'Deleted');
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastr.error('Failed to delete category', 'Error');
        }
      });

      this.subscription.add(sub);
    }
  }

}
