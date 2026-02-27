import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Product } from '../../model/Product';
import { ProductsService } from '../../service/products';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css'
})
export class ViewProductComponent implements OnInit {

  product: Product | null = null;
  title = 'Product Details';

  constructor(
    private service: ProductsService,
    private ref: MatDialogRef<ViewProductComponent>,
    private cd: ChangeDetectorRef,   // 👈 AJOUT ICI
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.code > 0) {
      this.service.getProductById(this.data.code).subscribe(res => {
        this.product = res;
        this.cd.detectChanges();   // 👈 ET ICI
      });
    }
  }

  closePopUp() {
    this.ref.close();
  }
}
