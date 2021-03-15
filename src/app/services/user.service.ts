import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import urls from "../constants/Url";
import { UserLogin } from "../models/user-login.model";
import UserWithToken from "../models/user-with-token.model";
import { User } from "../models/user.model";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userWithToken: Observable<UserWithToken>;
  userLogin: UserLogin;
  isLoggedIn = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) {}

  login(userLogin: UserLogin) {
    this.userWithToken = this.http
      .post<UserWithToken>(urls.LOGIN_URL, userLogin)
      .pipe(
        tap((userWithToken) => {
          // Save todos in local storage
          this.dataService.updateTodos(userWithToken.user.userTodos);

          // Save todos in Subject<Todo[]> for realtime access
          this.dataService.todos.next(userWithToken.user.userTodos);

          // Save user to the local storage (for getting userId while updating todos)
          this.dataService.updateUserWithToken(userWithToken);

          // Save jwt token in local storage
          this.dataService.updateToken(userWithToken.token);

          // Set the isLoggedIn Subject to true for showing the headers
          this.isLoggedIn.next(true);
        })
      );

    this.router.navigate(["todos"]);
  }

  signUp(user: User) {
    this.userWithToken = this.http
      .post<UserWithToken>(urls.ADD_NEW_USER_URL, user)
      .pipe(
        tap((userWithToken) => {
          // Save todos in local storage
          this.dataService.updateTodos(userWithToken.user.userTodos);

          // Save todos in Subject<Todo[]> for realtime access
          this.dataService.todos.next(userWithToken.user.userTodos);

          // Save user to the local storage (for getting userId while updating todos)
          this.dataService.updateUserWithToken(userWithToken);

          // Save jwt token in local storage
          this.dataService.updateToken(userWithToken.token);
        })
      );

    this.router.navigate(["todos"]);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
    this.router.navigate(["/"]);
  }
}
