import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {CookieService} from "./cookie.service";
import {Router} from "@angular/router";
import {RemoteDataService} from "./remotedata.service";
import {ShoppingCartSharingService} from './full/shopping-cart-sharing.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  user: any;
  public currentUserSubject: Subject<any> = new Subject<any>();

  public menuOtionsInds:any={};


  constructor(private http: HttpClient, private cookieService: CookieService, private remoteDataService: RemoteDataService , private router: Router, private shoppingSharingService: ShoppingCartSharingService) {}
  public currentUser(): any {
    if (!this.user) {
      this.user = JSON.parse(<string>this.cookieService.getCookie(this.remoteDataService.platform+'_user'));
    }
    return this.user;
  }

  login(password: string ,email: string) {
    return this.http.post<any>(this.remoteDataService.serviceURL + 'loginUser',
      {
        password: password,
        email: email,
      } , httpOptions)
      .pipe(map(user => {
        if (user) {
          this.user = user;
          this.currentUserSubject.next(this.user);
          this.cookieService.deleteCookie(this.remoteDataService.platform+'_user');
          this.cookieService.setCookie(this.remoteDataService.platform+'_user', JSON.stringify(user), 1);
        }
        return user;
      }));
  }

  logout() {
    this.cookieService.deleteCookie(this.remoteDataService.platform+'_user');
    this.user = null;

    //Όταν ένας χρήστης απασυνδέεται τότε διαγράφονται όλα τα προιόντα από το καλάθι του
    this.shoppingSharingService.removeEverythingFromShoppingCart()
  }
}
