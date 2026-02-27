import { Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { CategoriesService } from '../../service/categories';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/Category';

@Component({
  standalone: true,
  selector: 'app-add-category',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardActions,
    MatButton,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-category.html',
  styleUrls: ['./add-category.css'],
})
export class AddCategoryComponent implements OnInit {

  title = 'Add Category';
  dialodata: any;
  isEdit = false;

  constructor(
    private service: CategoriesService,
    private ref: MatDialogRef<AddCategoryComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  categoryForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    description: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.dialodata = this.data;

    if (this.dialodata && this.dialodata.code > 0) {
      this.title = 'Edit Category';
      this.isEdit = true;

      this.service.getCategoryById(this.dialodata.code).subscribe(item => {
        if (item) {
          this.categoryForm.setValue({
            name: item.name,
            description: item.description ?? ''
          });
        }
      });
    }
  }

  SaveCategory(): void {
    if (this.categoryForm.valid) {

      const formValue = this.categoryForm.getRawValue();

      const _data: Category = {
        name: formValue.name,
        description: formValue.description
      };

      if (this.isEdit) {
        this.service.updateCategory(this.dialodata.code, _data).subscribe(() => {
          this.toastr.success('Saved Successfully', 'Updated');
          this.closePopUp();
        });
      } else {
        this.service.addCategory(_data).subscribe(() => {
          this.toastr.success('Saved Successfully', 'Created');
          this.closePopUp();
        });
      }
    }
  }

  closePopUp(): void {
    this.ref.close();
  }
}
