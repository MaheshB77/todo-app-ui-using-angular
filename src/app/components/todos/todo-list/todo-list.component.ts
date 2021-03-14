import { HttpClient } from "@angular/common/http";
import { Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs";
import { Todo } from "src/app/models/todo.model";
import UserWithToken from "src/app/models/user-with-token.model";
import { DataService } from "src/app/services/data.service";
import { TodosService } from "src/app/services/todos.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todosService: TodosService,
    private userService: UserService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {

    this.activatedRoute.data.subscribe((data: Data) => {
      if(data["userWithToken"]) {
        console.log("User with token : ", data["userWithToken"]);
        this.todos = data["userWithToken"].user.userTodos;
      } else {
        // Get from local storage
        this.todos = this.dataService.getTodos();
      }
    });
  }

}
