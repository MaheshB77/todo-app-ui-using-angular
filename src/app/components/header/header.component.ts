import { Component, OnInit } from "@angular/core";
import { TodosService } from "src/app/services/todos.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isShowing: boolean = false;

  constructor(private todosService: TodosService) {}

  ngOnInit() {}
}
