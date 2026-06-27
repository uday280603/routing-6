import { Injectable, InjectionToken, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Iproduct } from '../model/Iproduct';
import { Ires } from '../model/Ires';


@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  productsArray: Iproduct[] = [
    {
      productId: 1,
      productName: 'MacBook Air M3',
      price: 114999,
      description: 'Lightweight laptop powered by Apple M3 chip.',
      brand: 'Apple',
      category: 'Laptop',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rG8e565ZPESPMyBTDIoe6xQMCzJd69Ef1yCkdY31VQ&s=10',
      stock: 12,
      rating: 4,
      color: 'Space Gray',
      warranty: '1',
      seller: 'Apple Store',
      isAvailable: true,
    },
    {
      productId: 2,
      productName: 'Dell XPS 15',
      price: 129999,
      description: 'Premium Windows laptop with Intel Core i7 processor.',
      brand: 'Dell',
      category: 'Laptop',
      img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      stock: 8,
      rating: 3,
      color: 'Silver',
      warranty: '2',
      seller: 'Dell Store',
      isAvailable: false,
    },
  ];

  fetchAll(): Observable<Iproduct[]> {
    return of(this.productsArray);
  }

  getProductbyId(productId: number): Observable<Iproduct> {
    let productObj = this.productsArray.find((p) => p.productId === productId)!;
    return of(productObj);
  }
  onAddProduct(productObj: Iproduct): Observable<Ires<Iproduct>> {
    this.productsArray.unshift(productObj);
    return of({
      msg: `The new product with id ${productObj.productId} is added in database...!!`,
      data: productObj,
    });
  }

  editProductObj(productId: number): Observable<Iproduct> {
    let productObj = this.productsArray.find((p) => p.productId === productId)!;
    return of(productObj);
  }

  onupdateProduct(productObj : Iproduct)  : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArray.findIndex(p => p.productId === productObj.productId);
    this.productsArray[GETINDEX] = productObj;
    return of({
      msg : `Product with id ${productObj.productId} is updated successfully..!`,
      data : productObj
    })

  }

  removeProduct(removeId : number) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArray.findIndex(p  => p.productId ===  removeId);
    let arr = this.productsArray.splice(GETINDEX,1);
    return of ({
      msg : `The product with id ${removeId} is removed successfully..!`,
      data : arr[0]
    })

  }
}
