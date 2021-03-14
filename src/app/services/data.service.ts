import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/todo.model";
import UserWithToken from "../models/user-with-token.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  jwtToken = new Subject<string>();
  todos = new Subject<Todo[]>();
  userWithToken = new Subject<UserWithToken>();

  updateToken(jwtToken: string) {
    // Saving jwtToken to the browser local storage
    localStorage.setItem("jwtToken", jwtToken);
  }

  updateTodos(todos: Todo[]) {
    // Saving todos to the browser local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  updateUserWithToken(userWithToken: UserWithToken) {
    // Saving user with token to the browser local storage
    localStorage.setItem("userWithToken", JSON.stringify(userWithToken));
  }

  getJwtToken(): string {
    let currentJwtToken: string;
    currentJwtToken = localStorage.getItem("jwtToken");
    return currentJwtToken;
  }

  getTodos(): Todo[] {
    let currentTodos: Todo[];
    currentTodos = JSON.parse(localStorage.getItem("todos"));
    return currentTodos;
  }

  getUserWithToken(): UserWithToken {
    let currentUserWithToken: UserWithToken;
    currentUserWithToken = JSON.parse(localStorage.getItem("userWithToken"));
    return currentUserWithToken;
  }

  getUser(): User {
    let userWithToken = <UserWithToken>(
      JSON.parse(localStorage.getItem("userWithToken"))
    );
    let user = userWithToken.user;
    let user1: User = new User(
      user.userFirstName,
      user.userLastName,
      user.userEmail,
      user.password,
      user.userTodos
    );

    return user1;
  }
}
