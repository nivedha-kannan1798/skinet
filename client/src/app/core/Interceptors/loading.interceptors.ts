import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { BusyService } from "../services/busy.service";
@Injectable()
export class LoadingInterceptors implements HttpInterceptor{
 constructor(private busyservice:BusyService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.busyservice.busy();
       return next.handle(req).pipe(
           delay(1000),
       finalize(()=>{this.busyservice.idle()})
       );
    
    }
    
}