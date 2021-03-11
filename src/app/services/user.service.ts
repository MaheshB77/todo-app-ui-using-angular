import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { delay } from "rxjs/operators";
import urls from '../constants/Url';
import { Todo } from '../models/todo.model';
import { UserLogin } from '../models/user-login.model';
import UserWithToken from '../models/user-with-token.model';
import { TodosService } from './todos.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtToken = new Subject<string>();
  // todos = new Subject<Todo[]>();
  todos = new EventEmitter<Todo[]>();
  userLogin: UserLogin;

  constructor(private http: HttpClient, private router: Router) { }

  login(userLogin: UserLogin) {
    // this.http.post<UserWithToken>(urls.LOGIN_URL, userLogin).subscribe((userWithToken) => {
    //   console.log(userWithToken);
    //   this.jwtToken.next(userWithToken.jwtToken);
    //   // this.todos.next(userWithToken.user.userTodos);
    //   this.todos.emit(userWithToken.user.userTodos);
    //   console.log("From service : ", userWithToken.user.userTodos);
    //   this.router.navigate(["/todos"]);
    // });
    return this.http.post<UserWithToken>(urls.LOGIN_URL, userLogin);
    // this.userLogin = userLogin;
  }
}
