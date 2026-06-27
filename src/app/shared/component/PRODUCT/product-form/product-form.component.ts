import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { ProductService } from 'src/app/shared/service/productService';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  productId!: number;
  productObj!: Iproduct;
  isInEditMode: boolean = false;

  constructor(
    private _snackbar: SnackbarService,
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoutes: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.onCreateProduvtForm();
    this.onPatchData();
  }

  onCreateProduvtForm() {
    this.productForm = new FormGroup({
      productName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      warranty: new FormControl(null, [Validators.required]),
      seller: new FormControl(null, [Validators.required]),
      isAvailable: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onAddProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      let NEW_OBJ = {
        ...this.productForm.value,
        productId: Date.now(),
      };
      this._productService.onAddProduct(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['/products']);
        },
      });
    }
  }

  onPatchData() {
    this._activatedRoutes.paramMap.subscribe((params) => {
      this.productId = +params.get('productId')!;
    });
    if (this.productId) {
      this._productService.editProductObj(this.productId).subscribe({
        next: (data) => {
          this.productObj = data;
          this.productForm.patchValue(this.productObj);
          this.isInEditMode = true
        },
      });
    }
  }

  onUpdateProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      let UPDATED_OBJ = {
        ...this.productForm.value,
        productId: this.productId,
      };
      this._productService.onupdateProduct(UPDATED_OBJ).subscribe({
        next: (data) => {
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['/products']);
        },
      });
    }
  }

}
