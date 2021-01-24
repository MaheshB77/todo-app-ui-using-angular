import { Component, OnInit } from "@angular/core";
import { TodosService } from "src/app/services/todos.service";
@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  donutChartData: any;
  constructor(private todosService: TodosService) {
    this.donutChartData = [
      ["TODO", "Quantity"],
      ["Completed", this.todosService.completed],
      ["Pending", this.todosService.pending],
      ["Deleted", this.todosService.deleted],
    ];
  }
  ngOnInit() {}
}
