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
  constructor() {}

  getTodoById(todoId: number): Todo {
    return this.todos.find((todo) => todo.todoId === todoId);
  }

  addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];
    this.updatedTodos.next(this.todos);
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
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.todoId !== todoId);
    this.updatedTodos.next(this.todos);
  }
}
