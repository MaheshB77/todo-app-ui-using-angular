import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Todos from "../data/todos";
import { Todo } from "../models/todo.model";

@Injectable({
  providedIn: "root",
})
export class TodosService {
  updatedTodos = new Subject<Todo[]>();
  todos: Todo[] = Todos;
  pending: number = 0;
  completed: number = 0;
  deleted: number = 0;
  constructor() {
    this.setStats();
  }

  getTodoById(todoId: number): Todo {
    return this.todos.find((todo) => todo.todoId === todoId);
  }

  addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];
    this.updatedTodos.next(this.todos);
    this.setStats();
  }

  updateTodo(updatedTodo: Todo) {
    this.todos = this.todos.map((todo) => {
      if (todo.todoId === updatedTodo.todoId) {
        return updatedTodo;
      } else {
        return todo;
      }
    });
    this.updatedTodos.next(this.todos);
    this.setStats();
  }

  updateStatus(todoId: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.todoId === todoId) {
        todo.todoStatus = "completed";
        return todo;
      } else {
        return todo;
      }
    });
    this.updatedTodos.next(this.todos);
    this.setStats();
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.todoId !== todoId);
    this.updatedTodos.next(this.todos);
    this.setStats();
    this.deleted = this.deleted + 1;
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
