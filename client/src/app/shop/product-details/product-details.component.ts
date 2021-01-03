import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
 product:IProduct | undefined;
  constructor(private shopservice:ShopService,private activateRoute:ActivatedRoute,private bcservice: BreadcrumbService) { 

    this.bcservice.set('@productDetails',' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }
loadProduct(){
  //this.shopservice.getProduct(12).subscribe(product=>{
 
 this.shopservice.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product=>{
    this.product=product;
    this.bcservice.set('@productDetails',product.name);
  },error=>{
    console.log(error);
  })
}
}
