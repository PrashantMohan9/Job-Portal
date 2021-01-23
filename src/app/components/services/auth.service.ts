import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from "../../models/auth-data";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  public id:String;
  private type:string;

  constructor(private http: HttpClient, private router: Router) { }

  public getToken() {
    return this.token;
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  public getType() {
    return this.type;
  }

  createUser(email: string, password: string, name: string, type: string){
    const authData: AuthData = {
      email:email,
      password:password,
      name:name,
      type:type
    };

    this.http.post(environment.baseUrl + "/user/signup", authData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  login(email: string, password: string) {
    const authData = {
      email:email,
      password:password
    }
    this.http.post<{token: string,name:string, type: string,email:string, _id:string}>(environment.baseUrl + "/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          this.isAuthenticated = true;
          this.id = response._id;
          this.type = response.type;

          localStorage.setItem('token', response.token);
          localStorage.setItem('UserName', response.name);
          localStorage.setItem('email', response.email);
          localStorage.setItem('_id', response._id);

          if(response.type=='candidate'){
            this.router.navigate(['/candidate']);
          }
          else if(response.type=='recruiter'){
            this.router.navigate(['/recruiter']);
          }
        }
      },
      error => {
        alert("Wrong Credentials");
      },
      );
  }

  logout() {
    this.token=null;
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    localStorage.removeItem('email');
    localStorage.removeItem('_id');
    this.isAuthenticated=false;
    this.router.navigate(['/']);
  }

}
