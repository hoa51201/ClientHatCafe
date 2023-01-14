import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { AuthenticationsService } from './authentications.service';
import { SystemConstants } from '../common/System';
import { Observable, throwError  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private auth : AuthenticationsService,
    private formBuilder :FormBuilder,
    
  ) { }
  form = this.formBuilder.group({
    name:["",[Validators.required,Validators.maxLength(100)]],
    email:["",[Validators.required,Validators.maxLength(100)]],
    phone:["",[Validators.required,Validators.maxLength(12)]],
    address:["",[Validators.required,Validators.maxLength(100)]]
  })
  GET(path: any){
    return this.http.get(`${SystemConstants.BASE_API}/${path}`).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  POST(path: any,data :object){
    return this.http.post(`${SystemConstants.BASE_API}/${path}`, data).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  PUT(path: any,data :object){
    return this.http.put(`${SystemConstants.BASE_API}/${path}`, data).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }
  DELETE(path: any,key :any, Id:any){
    return this.http.delete(`${SystemConstants.BASE_API}/${path}?${key}=${Id}`).pipe(
      catchError(this.handleError),
      res=>res,
    )
  }





  // DELETE(path: any, Id:any){
  //   return this.http.delete(`${SystemConstants.BASE_API}/${path}=${Id}`).pipe(
  //     catchError(this.handleError),
  //     res=>res,
  //   )
  // }
  private handleError(error: HttpErrorResponse) {
    if (error.status  ===0) {
      console.log('An error occurred: ' + error.error)
    }
    else {
      console.log('Back end return code: ' + error.status + '; body was: ' + JSON.stringify(error.error))
    }
    return throwError('Some thing wrong')
  }
}
