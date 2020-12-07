import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IProduct } from './models/product';
import { IPagination } from './models/paginations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit
{
  title = 'Skinet';
  products: IProduct[] | undefined ;

  constructor(private http: HttpClient){}

  ngOnInit(): void {

   this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe(
     (response: any) =>
      {
   this.products = response.data;
   console.log(this.products);
   }, error => {

    console.log(error);
   });

  }
}
