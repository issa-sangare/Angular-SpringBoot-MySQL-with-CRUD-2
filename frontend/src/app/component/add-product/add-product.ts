import {Component, Inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {Product} from '../../model/Product';
import {ProductService} from '../../service/products';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
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
    MatButton
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProductComponent implements OnInit {

  title = 'Add Product'
  dialodata: any;
  isEdit = false;
  constructor(private service: ProductService, private ref: MatDialogRef<AddProductComponent>,
              private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.dialodata=this.data;
    if (this.dialodata.code > 0){
      this.title = 'Edit Product';
      this.isEdit = true;
      this.service.getProductById(this.dialodata.code).subscribe(item=>{
        let _data = item;
        if(_data != null){
          this.productForm.setValue({
            name: _data.name,
            price: _data.price,
            quantity: _data.quantity,
            category: _data.category,
            dateOfCreation: _data.dateOfCreation,
            description: _data.description
          });
        }
      })
    }
  }

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    dateOfCreation: new FormControl(new Date(), Validators.required),
    description: new FormControl('')
  })

  SaveProduct() {
    if (this.productForm.valid) {

      let _data: Product = {
        name: this.productForm.value.name as string,
        price: this.productForm.value.price as number,
        quantity: this.productForm.value.quantity as number,
        category: this.productForm.value.category as string,
        dateOfCreation: new Date(this.productForm.value.dateOfCreation as Date),
        description: this.productForm.value.description as string,
      }

      if (this.isEdit){
        this.service.updateProduct(this.dialodata.code, _data).subscribe(() => {
          this.toastr.success('Saved Successfully', 'Updated');
          this.closePopUp();
        });
      }
      else {
        this.service.addProduct(_data).subscribe(() => {
          this.toastr.success('Saved Successfully', 'Created');
          this.closePopUp();
        });
      }
    }
  }

  closePopUp(){
    this.ref.close();
  }
}
