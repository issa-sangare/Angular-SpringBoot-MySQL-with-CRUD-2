import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {Supplier} from '../../model/Supplier';
import {SuppliersService} from '../../service/suppliers';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './view-supplier.html',
  styleUrl: './view-supplier.css'
})
export class ViewSupplierComponent implements OnInit {

  supplier: Supplier | null = null;
  title = 'Supplier Details';

  constructor(
    private service: SuppliersService,
    private ref: MatDialogRef<ViewSupplierComponent>,
    private cd: ChangeDetectorRef,   // 👈 AJOUT ICI
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.code > 0) {
      this.service.getSupplierById(this.data.code).subscribe(res => {
        this.supplier = res;
        this.cd.detectChanges();   // 👈 ET ICI
      });
    }
  }

  closePopUp() {
    this.ref.close();
  }
}
