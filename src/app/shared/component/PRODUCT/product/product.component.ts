import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../../HOME/get-confirm/get-confirm.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/service/productService';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { Iproduct } from 'src/app/shared/model/Iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productId!: number;
  productObj!: Iproduct;

  constructor(
    private _activedRoutes: ActivatedRoute,
    private _productService: ProductService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._activedRoutes.paramMap.subscribe((para) => {
      this.productId = +para.get('productId')!;
      this._productService.getProductbyId(this.productId).subscribe({
        next: (data) => {
          this.productObj = data;
        },
      });
    });
  }

  onRemove() {
    let config = new MatDialogConfig();
    ((config.width = '400px'), (config.disableClose = true));
    config.data = `Are youir sure to reomove the product with id ${this.productId}..?`;
    let _matdialogRef = this._matDialog.open(GetConfirmComponent, config);
    _matdialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation === true) {
        this._productService.removeProduct(this.productId).subscribe({
          next: (data) => {
            this._snackbar.opensnackbar(data.msg);
            this._router.navigate(['/products']);
          },
        });
      }
    });
  }
}
