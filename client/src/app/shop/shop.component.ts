import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false}) searchTerm: ElementRef| undefined ;
  products: IProduct[] | undefined;
  productBrands: IBrand[] | undefined ;
  types: IProductType[] | undefined;
  shopParams = new ShopParams();
  totalcount: number | undefined;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price:High to Low', value: 'priceDesc'}
  ];
  constructor(private shopservice: ShopService) { }

  ngOnInit(): void {
this.getProducts();
this.getBrands();
this.getTypes();
  }

 // tslint:disable-next-line: typedef
 getProducts(){
 
  this.shopservice.getProducts(this.shopParams).subscribe((response:any| null | undefined) => {
   this.products = response.data;
    this.shopParams.pageNumber = response.pageIndex;
    this.shopParams.pageSize = response.pageSize;
    this.totalcount = response.count;
    }, error => {
      console.log(error);
    });

 }

 // tslint:disable-next-line: typedef
 getBrands(){
  this.shopservice.getBrands().subscribe(response => {
    this.productBrands = [{id: 0 , name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
 }
 // tslint:disable-next-line: typedef
 getTypes(){
  this.shopservice.getTypes().subscribe(response => {
    this.types = [{id: 0 , name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
 }
 // tslint:disable-next-line: typedef
 onBrandSelected(brandId: number){

  this.shopParams.brandId = brandId;
  this.shopParams.pageNumber = 1;
  this.getProducts();
 }
 // tslint:disable-next-line: typedef
 onTypeSelected(typeId: number){

  this.shopParams.typeId = typeId;
  this.shopParams.pageNumber = 1;
  this.getProducts();
 }
 // tslint:disable-next-line: typedef
 onSortSelected(sort: string){

  this.shopParams.sort = sort;
  this.getProducts();
 }
 // tslint:disable-next-line: typedef
 onPageChanged(event: any){
 if(this.shopParams.pageNumber !== event) {
  this.shopParams.pageNumber = event;
  this.getProducts();
 }
 }
 // tslint:disable-next-line: typedef
 onSearch(){
   this.shopParams.search = this.searchTerm?.nativeElement.value;
   this.shopParams.pageNumber = 1;
   this.getProducts();
 }
 // tslint:disable-next-line: typedef
 onReset()
 {
   this.searchTerm.nativeElement.value = '';
   this.shopParams = new ShopParams();
   this.getProducts();
 }
}
