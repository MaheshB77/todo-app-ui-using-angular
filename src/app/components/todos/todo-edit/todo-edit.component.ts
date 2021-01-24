import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Todo } from "src/app/models/todo.model";
import { TodosService } from "src/app/services/todos.service";

@Component({
  selector: "app-todo-edit",
  templateUrl: "./todo-edit.component.html",
  styleUrls: ["./todo-edit.component.css"],
})
export class TodoEditComponent implements OnInit {
  @ViewChild("todoForm") todoForm: NgForm;
  todoTitle: string;
  isEditing: boolean = false;
  isNewTodo: boolean = false;
  existingTodo: Todo;
  todoId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        // If editing already existing todo
        this.todoId = parseInt(params.id);
        this.existingTodo = this.todosService.getTodoById(this.todoId);
        this.todoTitle = this.existingTodo.todoTitle;
        this.isNewTodo = false;
      } else {
        // If creating new todo
        this.isNewTodo = true;
      }
    });
  }

  onSubmit(todoForm: NgForm) {
    if (this.isNewTodo) {
      let id = this.todosService.todos.length + 1; //Generating simple unique id
      let title = todoForm.value.todoTitle;
      let status = "pending";
      let newTodo = new Todo(id, title, status);
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
    console.log("Completed");

    // Change the status of TODO to "completed"
    // Return to the "/todos" route
  }
}
