import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/todo.model";
import Constants from "../constants/Constants";
import { UserService } from "./user.service";
import { DataService } from "./data.service";
import urls from "../constants/Url";
import { User } from "../models/user.model";
import UserWithToken from "../models/user-with-token.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TodosService {
  updatedTodos = new Subject<Todo[]>();
  todos: Todo[];
  isLoading: boolean = false;
  pending: number = 0;
  completed: number = 0;
  deleted: number = 0;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {
    this.getTodos();
  }

  getTodoById(todoId: string): Todo {
    return this.todos.find((todo) => todo.todoId === todoId);
  }

  // Add new todo
  addTodo(todo: Todo) {
    // Create the request body to add the todo
    let userToUpdate = this.dataService.getUser();
    let todos = [...this.dataService.getTodos(), todo];
    userToUpdate.userTodos = todos;
    let userId = this.dataService.getUserWithToken().user.id;
    let jwtToken = this.dataService.getJwtToken();

    // Making HTTP request to add the new todo
    this.http
      .put<User>(urls.UPDATE_TODOS_URL + `${userId}`, userToUpdate, {
        headers: { AuthorizedToken: jwtToken },
      })
      .subscribe(
        (updatedResponse) => {
          console.log("Response after adding new todo : ", updatedResponse);

          // Preparing the data to be stored in local storage
          let updatedUserWithToken: UserWithToken = {
            user: {
              id: updatedResponse.id,
              userFirstName: updatedResponse.userFirstName,
              userLastName: updatedResponse.userLastName,
              userEmail: updatedResponse.userEmail,
              password: updatedResponse.password,
              userTodos: updatedResponse.userTodos,
            },
            token: this.dataService.getJwtToken(),
          };

          // Save the returned data from the backend to the local storage
          this.dataService.updateUserWithToken(updatedUserWithToken);
          this.dataService.updateTodos(updatedUserWithToken.user.userTodos);
          this.dataService.todos.next(updatedUserWithToken.user.userTodos);
        },
        (err) => {
          console.log("Error occured during adding new todo : ", err);
        }
      );
  }

  updateTodo(updatedTodo: Todo) {
    console.log("Todo to be updated : ", updatedTodo);

    // Preparing the request body to update the todos
    let userToUpdate = this.dataService.getUser();
    let updatedTodos = this.dataService.getTodos().map((todo) => {
      if (todo.todoId === updatedTodo.todoId) {
        return updatedTodo;
      } else {
        return todo;
      }
    });
    userToUpdate.userTodos = updatedTodos;
    let userId = this.dataService.getUserWithToken().user.id;
    let jwtToken = this.dataService.getJwtToken();

    // Making http request to update the todo
    this.http
      .put(urls.UPDATE_TODOS_URL + `${userId}`, userToUpdate, {
        headers: { AuthorizedToken: jwtToken },
      })
      .subscribe((response) => {
        console.log(response);
      }, (err) => {
        console.log(err.error);
      });
  }

  updateStatus(todoId: string) {
    // Finding the todo to mark it as complete
    let completedTodo = this.todos.find((todo) => todo.todoId === todoId);
    completedTodo.todoStatus = "completed";

    this.http
      .put(
        `http://localhost:${Constants.PORT}/api/todos/${todoId}`,
        completedTodo
      )
      .subscribe((response) => {
        console.log("Todo marked as complete");
        this.getTodos();
      });
  }

  deleteTodo(todoId: string) {
    this.http
      .delete(`http://localhost:${Constants.PORT}/api/todos/${todoId}`, {
        responseType: "text",
      })
      .subscribe((response) => {
        console.log(response);
        console.log("Todo deleted !!");
        this.getTodos();
      });
  }

  getTodos() {
    // Get todos from localStorage
    this.todos = this.dataService.getTodos();

    // Update/Set the stats
    this.setStats();
  }

  setStats() {
    this.pending = this.todos.filter(
      (todo) => todo.todoStatus === "pending"
    ).length;
    this.completed = this.todos.filter(
      (todo) => todo.todoStatus === "completed"
    ).length;
  }
}
