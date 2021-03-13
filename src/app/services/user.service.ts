import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import urls from '../constants/Url';
import { Todo } from '../models/todo.model';
import { UserLogin } from '../models/user-login.model';
import UserWithToken from '../models/user-with-token.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtToken = new Subject<string>();
  todos = new Subject<Todo[]>();
  userWithToken = new Subject<UserWithToken>();
  userLoginObservable: Observable<UserWithToken>;
  userLogin: UserLogin;

  constructor(private http: HttpClient, private router: Router) { }

  login(userLogin: UserLogin) {
    
    this.userLoginObservable = this.http.post<UserWithToken>(urls.LOGIN_URL, userLogin).pipe(tap(userWithToken => {
      console.log("From TAP : " , userWithToken);
      this.userWithToken.next(userWithToken);
      this.todos.next(userWithToken.user.userTodos);
    }));

    this.router.navigate(["todos"]);
  }

  getUserLoginObservable(): Observable<UserWithToken> {
    return this.userLoginObservable;
  }
}
