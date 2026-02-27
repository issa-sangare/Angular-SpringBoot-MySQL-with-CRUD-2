import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AddProductComponent} from '../add-product/add-product';
import { MatDialog } from '@angular/material/dialog';
import {Product} from '../../model/Product';
import { ProductsService } from '../../service/products';
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
import {DecimalPipe} from '@angular/common';
import {ViewProductComponent} from '../view-product/view-product';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {inject} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
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
    MatIconButton,
    MatPaginatorModule,
    MatSortModule,
    MatInput,
    MatFormField,
    MatLabel
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  productList: Product[] = [];
  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['name', 'price', 'quantity', 'category', 'supplier', 'action'];
  subscription: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private service: ProductsService, private toastr: ToastrService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // 🔹 Custom sorting (si déjà ajouté)
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category':
          return item.category?.name?.toLowerCase() || '';
        case 'supplier':
          return item.supplier?.name?.toLowerCase() || '';
        default:
          return (item as any)[property];
      }
    };

    // 🔹 Custom filtering
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const values = [
        data.name,
        data.price?.toString(),
        data.quantity?.toString(),
        data.category?.name,
        data.supplier?.name
      ];

      return values
        .filter(v => v)
        .some(v => v!.toLowerCase().includes(filter));
    };
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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

  DeleteProduct(product: Product) {

    // 🔹 Vérification que l'ID est défini
    if (product.id == null) {
      console.error('Product ID is undefined');
      this.toastr.error('Product ID is undefined', 'Error');
      return;
    }

    // 🔹 Ouvrir la boîte de dialogue de confirmation
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete "${product.name}" ? This action cannot be undone.`
      }
    });

    // 🔹 Après fermeture du dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 🔹 Supprimer le produit en s'assurant que l'ID n'est pas undefined
        const sub = this.service.deleteProduct(product.id!).subscribe({
          next: () => {
            this.GetAllProducts();
            this.toastr.success('Product deleted successfully', 'Deleted');
          },
          error: (err) => {
            console.error('Delete failed', err);
            this.toastr.error('Failed to delete product', 'Error');
          }
        });

        // 🔹 Ajouter l'abonnement pour nettoyage ultérieur
        this.subscription.add(sub);
      }
    });
  }

  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }
}
