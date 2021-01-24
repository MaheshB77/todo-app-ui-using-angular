import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-todo-edit",
  templateUrl: "./todo-edit.component.html",
  styleUrls: ["./todo-edit.component.css"],
})
export class TodoEditComponent implements OnInit {
  isEditing: boolean = true;

  constructor() {}

  ngOnInit() {}
}
