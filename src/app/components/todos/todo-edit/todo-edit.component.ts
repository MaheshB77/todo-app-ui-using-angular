import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Todo } from "src/app/models/todo.model";
import { TodosService } from "src/app/services/todos.service";
import { v4 as uuid} from 'uuid';

@Component({
  selector: "app-todo-edit",
  templateUrl: "./todo-edit.component.html",
  styleUrls: ["./todo-edit.component.css"],
})
export class TodoEditComponent implements OnInit {
  @ViewChild("todoForm") todoForm: NgForm;
  todoTitle: string;
  isNewTodo: boolean = false;
  existingTodo: Todo;
  todoId: string;
  showDeleteButton: boolean = false;
  showMarkAsCompleteButton: boolean = false;
  disableInput: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        // If editing already existing todo
        this.todoId = params.id;
        this.existingTodo = this.todosService.getTodoById(this.todoId);
        this.todoTitle = this.existingTodo.todoTitle;
        this.showMarkAsCompleteButton =
        this.existingTodo.todoStatus !== "completed";
        this.disableInput = this.existingTodo.todoStatus === "completed";
        this.isNewTodo = false;
        this.showDeleteButton = true;
      } else {
        // If creating new todo
        this.isNewTodo = true;
        this.showDeleteButton = false;
        this.showMarkAsCompleteButton = false;
      }
    });
  }

  onSubmit(todoForm: NgForm) {
    if (this.isNewTodo) {
      let todoId = uuid();
      let todoTitle = todoForm.value.todoTitle;
      let todoStatus = "pending"; // Setting default status
      let newTodo = { todoId, todoTitle, todoStatus };
      this.todosService.addTodo(newTodo);
    } else {
      let oldTodo = this.todosService.getTodoById(this.todoId);
      oldTodo.todoTitle = todoForm.value.todoTitle;
      this.todosService.updateTodo(oldTodo);
    }

    todoForm.reset();
    this.router.navigate(["/todos"]);
  }

  onCancel() {
    this.router.navigate(["todos"]);
  }

  onComplete() {
    this.todosService.updateStatus(this.todoId);
    this.disableInput = true;
  }

  onDelete() {
    this.todosService.deleteTodo(this.todoId);
    this.todoForm.reset();
    this.router.navigate(["/todos"]);
  }
}
