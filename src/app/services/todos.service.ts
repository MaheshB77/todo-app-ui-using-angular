import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/todo.model";
import Constants from "../constants/Constants";
import { UserService } from "./user.service";

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
  constructor(private http: HttpClient, private userService: UserService) {
    this.getTodos();
  }

  getTodoById(todoId: string): Todo {
    return this.todos.find((todo) => todo.todoId === todoId);
  }

  addTodo(todo: any) {
    this.http
      .post(`http://localhost:${Constants.PORT}/api/todos/add-todo`, todo)
      .subscribe((data) => {
        console.log("Added new todo ", data);
        this.getTodos();
      });
  }

  updateTodo(updatedTodo: Todo) {
    this.http
      .put(`http://localhost:${Constants.PORT}/api/todos/${updatedTodo.todoId}`, updatedTodo)
      .subscribe((response) => {
        console.log("Updated the todo");
        this.getTodos();
      });
  }

  updateStatus(todoId: string) {
    // Finding the todo to mark it as complete
    let completedTodo = this.todos.find((todo) => todo.todoId === todoId);
    completedTodo.todoStatus = "completed";

    this.http
      .put(`http://localhost:${Constants.PORT}/api/todos/${todoId}`, completedTodo)
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
    // this.http.get(`http://localhost:${Constants.PORT}/api/todos/`).subscribe((data) => {
    //   this.todos = <Todo[]>data;
    //   this.updatedTodos.next(this.todos);
    //   this.setStats();
    // });

    this.userService.todos.subscribe((todos) => {
      this.todos = todos;
    })

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
