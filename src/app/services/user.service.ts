import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import urls from "../constants/Url";
import { UserLogin } from "../models/user-login.model";
import UserWithToken from "../models/user-with-token.model";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userWithToken: Observable<UserWithToken>;
  userLogin: UserLogin;

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
        })
      );

    this.router.navigate(["todos"]);
  }
}
