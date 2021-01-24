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
}
