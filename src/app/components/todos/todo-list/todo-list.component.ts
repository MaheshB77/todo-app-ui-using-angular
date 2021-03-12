import { HttpClient } from "@angular/common/http";
import { Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs";
import urls from "src/app/constants/Url";
import { Todo } from "src/app/models/todo.model";
import UserWithToken from "src/app/models/user-with-token.model";
import { TodosService } from "src/app/services/todos.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  substription: Subscription;
  userWithToken: UserWithToken;
  
  constructor(
    private todosService: TodosService,
    private userService: UserService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activatedRoute.data.subscribe((data: Data) => {
      this.userWithToken = data["userWithToken"];
      this.todos = this.userWithToken.user.userTodos;
    });
  }

  ngOnDestroy() {
    // this.substription.unsubscribe();
  }
}
