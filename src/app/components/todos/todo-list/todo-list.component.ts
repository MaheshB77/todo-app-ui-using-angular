import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Todo } from "src/app/models/todo.model";
import { TodosService } from "src/app/services/todos.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];
  substription: Subscription;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos = this.todosService.todos;
    // If todos get updated
    this.substription = this.todosService.updatedTodos.subscribe(
      (updatedTodos: Todo[]) => {
        this.todos = updatedTodos;
      }
    );
  }

  ngOnDestroy() {
    this.substription.unsubscribe();
  }
}
