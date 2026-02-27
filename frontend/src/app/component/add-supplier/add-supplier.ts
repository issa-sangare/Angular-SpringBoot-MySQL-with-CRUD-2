import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {Supplier} from '../../model/Supplier';
import {SuppliersService} from '../../service/suppliers';

@Component({
  standalone: true,
  selector: 'app-add-supplier',
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
  templateUrl: './add-supplier.html',
  styleUrl: './add-supplier.css',
})
export class AddSupplierComponent implements OnInit {

  title = 'Add Supplier';
  dialodata: any;
  isEdit = false;
  suppliers: any;

  constructor(
    private service: SuppliersService,
    private ref: MatDialogRef<AddSupplierComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private suppliersService: SuppliersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  supplierForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    companyName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    address: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  ngOnInit() {
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
      this.title = 'Edit Supplier';
      this.isEdit = true;
      console.log('Editing product with code:', this.dialodata.code); // ← Vérifiez la valeur

      this.service.getSupplierById(this.dialodata.code).subscribe({
        next: (item) => {
          console.log('Received supplier:', item); // ← Vérifiez le produit reçu
          if (item) {
            this.supplierForm.patchValue({
              name: item.name,
              companyName: item.companyName,
              address: item.address,
              email: item.email,
              phone: item.phone
            });
          }
        },
        error: (err) => console.error('Error loading supplier:', err)
      });
    }
  }

  SaveSupplier() {
    if (this.supplierForm.valid) {
      const formValue = this.supplierForm.getRawValue();

      // Construire l'objet _data UNE SEULE FOIS
      const _data: Supplier = {
        name: formValue.name,
        companyName: formValue.companyName,
        address: formValue.address,
        email: formValue.email,
        phone: formValue.phone,
      };

      if (this.isEdit) {
        const supplierId = Number(this.dialodata.code);

        if (isNaN(supplierId) || supplierId <= 0) {
          this.toastr.error('Invalid product ID', 'Error');
          return;
        }

        console.log('Updating supplier with ID:', supplierId);
        console.log('Data:', _data);

        this.service.updateSupplier(supplierId, _data).subscribe({
          next: () => {
            this.toastr.success('Saved Successfully', 'Updated');
            this.closePopUp();
          },
          error: (err) => {
            console.error('Update error:', err);
            this.toastr.error('Error updating supplier: ' + (err.error?.message || 'Unknown error'), 'Error');
          }
        });
      } else {
        this.service.addSupplier(_data).subscribe({
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
