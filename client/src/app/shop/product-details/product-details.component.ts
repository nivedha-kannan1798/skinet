import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
 product:IProduct | undefined;
  constructor(private shopservice:ShopService,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }
loadProduct(){
  //this.shopservice.getProduct(12).subscribe(product=>{
 
  this.shopservice.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product=>{
    this.product=product;

  },error=>{
    console.log(error);
  })
}
}
