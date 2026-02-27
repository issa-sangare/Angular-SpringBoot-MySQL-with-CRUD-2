import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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
import {ViewSupplierComponent} from '../view-supplier/view-supplier';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {Supplier} from '../../model/Supplier';
import {SuppliersService} from '../../service/suppliers';
import {AddSupplierComponent} from '../add-supplier/add-supplier';

@Component({
  selector: 'app-suppliers',
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
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class SuppliersComponent implements OnInit, OnDestroy {
  supplierList: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>([]);
  displayedColumns: string[] = ['name', 'companyName', 'address', 'email', 'phone', 'action'];
  subscription: Subscription = new Subscription();

  constructor(private dialog : MatDialog, private service: SuppliersService, private toastr: ToastrService) {
  }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.GetAllSuppliers();
  }

  GetAllSuppliers(): void {
    let sub = this.service.getSuppliers().subscribe((item: Supplier[]) => {
      this.supplierList = item;
      this.dataSource.data = this.supplierList;   // 👈 IMPORTANT
    });

    this.subscription.add(sub);
  }

  addSupplier() {
    this.openPopup(0);
  }

  ReadSupplier(code: number) {
    this.dialog.open(ViewSupplierComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { code: code }
    });
  }

  EditSupplier(supplierId: number) {
    this.openPopup(supplierId);
  }

  openPopup(supplierId: number) {
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        'code': supplierId
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.GetAllSuppliers();
    });
  }

  DeleteSupplier(supplierId: number) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      const sub = this.service.deleteSupplier(supplierId).subscribe({
        next: (res) => {
          this.GetAllSuppliers();  // rafraîchit la liste
          this.toastr.success(res || 'Saved successfully', 'Deleted');
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastr.error('Failed to delete supplier', 'Error');
        }
      });

      this.subscription.add(sub);
    }
  }

}
