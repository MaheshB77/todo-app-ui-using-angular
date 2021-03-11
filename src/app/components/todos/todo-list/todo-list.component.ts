import { HttpClient } from "@angular/common/http";
import { Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  show = false;
  constructor(
    private todosService: TodosService,
    private userService: UserService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.userService.todos.subscribe((todos) => {
      this.todos = todos;
      console.log("From TODOLIST : ", this.todos);
    });
    this.show = true;
  }
  ngOnDestroy() {
    // this.substription.unsubscribe();
  }
}
