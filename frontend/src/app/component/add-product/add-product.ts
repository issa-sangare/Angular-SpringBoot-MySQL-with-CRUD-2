import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { Product } from '../../model/Product';
import { ProductsService } from '../../service/products';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/Category';
import { CategoriesService } from '../../service/categories';
import {Supplier} from '../../model/Supplier';
import {SuppliersService} from '../../service/suppliers';

@Component({
  standalone: true,
  selector: 'app-add-product',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatSelect,
    MatOption,
    MatCardActions,
    MatButton,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProductComponent implements OnInit {

  categories: Category[] = [];
  suppliers: Supplier[] = [];
  title = 'Add Product';
  dialodata: any;
  isEdit = false;

  constructor(
    private service: ProductsService,
    private ref: MatDialogRef<AddProductComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private categoryService: CategoriesService,
    private suppliersService: SuppliersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  productForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    price: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    quantity: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    category: new FormControl<Category | null>(null, Validators.required),
    dateOfCreation: new FormControl<Date>(new Date(), { nonNullable: true, validators: Validators.required }),
    supplier: new FormControl<Supplier | null>(null, Validators.required),
    description: new FormControl<string>('', { nonNullable: true })
  });

  compareCategory(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareSupplier(s1: Supplier, s2: Supplier): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });

    this.suppliersService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });

    this.dialodata = this.data;
    console.log('Dialog data:', this.dialodata); // ← Vérifiez ce qui est reçu

    if (this.dialodata?.code > 0) {
      this.title = 'Edit Product';
      this.isEdit = true;
      console.log('Editing product with code:', this.dialodata.code); // ← Vérifiez la valeur

      this.service.getProductById(this.dialodata.code).subscribe({
        next: (item) => {
          console.log('Received product:', item); // ← Vérifiez le produit reçu
          if (item) {
            this.productForm.patchValue({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              category: item.category,
              dateOfCreation: new Date(item.dateOfCreation),
              supplier: item.supplier,
              description: item.description
            });
          }
        },
        error: (err) => console.error('Error loading product:', err)
      });
    }
  }

  SaveProduct() {
    if (this.productForm.valid) {
      const formValue = this.productForm.getRawValue();

      // Construire l'objet _data UNE SEULE FOIS
      const _data: Product = {
        name: formValue.name,
        price: formValue.price,
        quantity: formValue.quantity,
        category: {
          id: formValue.category?.id!,
          name: formValue.category?.name!
        },
        description: formValue.description,
        supplier: {
          id: formValue.supplier?.id!,
          name: formValue.supplier?.name!
        },
        dateOfCreation: formValue.dateOfCreation
      };

      console.log(_data);

      if (this.isEdit) {
        const productId = Number(this.dialodata.code);

        if (isNaN(productId) || productId <= 0) {
          this.toastr.error('Invalid product ID', 'Error');
          return;
        }

        console.log('Updating product with ID:', productId);
        console.log('Data:', _data);

        this.service.updateProduct(productId, _data).subscribe({
          next: () => {
            this.toastr.success('Saved Successfully', 'Updated');
            this.closePopUp();
          },
          error: (err) => {
            console.error('Update error:', err);
            this.toastr.error('Error updating product: ' + (err.error?.message || 'Unknown error'), 'Error');
          }
        });
      } else {
        this.service.addProduct(_data).subscribe({
          next: () => {
            this.toastr.success('Saved Successfully', 'Created');
            this.closePopUp();
          },
          error: (err) => {
            console.error('Add error:', err);
            this.toastr.error('Error adding product', 'Error');
          }
        });
      }
    }
  }

  closePopUp() {
    this.ref.close();
  }
}
