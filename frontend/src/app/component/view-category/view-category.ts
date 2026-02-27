import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/Category';
import { CategoriesService } from '../../service/categories';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './view-category.html',
  styleUrl: './view-category.css'
})
export class ViewCategoryComponent implements OnInit {

  category: Category | null = null;
  title = 'Category Details';

  constructor(
    private service: CategoriesService,
    private ref: MatDialogRef<ViewCategoryComponent>,
    private cd: ChangeDetectorRef,   // 👈 AJOUT ICI
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.code > 0) {
      this.service.getCategoryById(this.data.code).subscribe(res => {
        this.category = res;
        this.cd.detectChanges();   // 👈 ET ICI
      });
    }
  }

  closePopUp() {
    this.ref.close();
  }
}
