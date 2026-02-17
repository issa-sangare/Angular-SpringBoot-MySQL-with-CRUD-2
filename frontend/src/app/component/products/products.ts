import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {AddProductComponent} from '../add-product/add-product';
import { MatDialog } from '@angular/material/dialog';
import {Product} from '../../model/Product';
import { ProductService } from '../../service/products';
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
import {DatePipe, DecimalPipe} from '@angular/common';
import {ViewProductComponent} from '../view-product/view-product';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-products',
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
    DatePipe,
    DecimalPipe,
    MatIcon
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'action'];
  subscription: Subscription = new Subscription();

  constructor(private dialog : MatDialog, private service: ProductService, private toastr: ToastrService) {
  }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.GetAllProducts();
  }

  GetAllProducts(): void {
    let sub = this.service.getProducts().subscribe((item: Product[]) => {
      this.productList = item;
      this.dataSource.data = this.productList;   // 👈 IMPORTANT
    });

    this.subscription.add(sub);
  }

  addProduct() {
    this.openPopup(0);
  }

  ReadProduct(code: number) {
    this.dialog.open(ViewProductComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { code: code }
    });
  }

  EditProduct(productId: number) {
    this.openPopup(productId);
  }

  openPopup(productId: number) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        'code': productId
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.GetAllProducts();
    });
  }

  DeleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const sub = this.service.deleteProduct(productId).subscribe({
        next: (res) => {
          this.GetAllProducts();  // rafraîchit la liste
          this.toastr.success(res || 'Saved successfully', 'Deleted');
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastr.error('Failed to delete product', 'Error');
        }
      });

      this.subscription.add(sub);
    }
  }

}
