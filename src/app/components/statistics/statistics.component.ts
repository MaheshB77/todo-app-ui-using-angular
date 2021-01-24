import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  donutChartData: any;
  constructor() {
    this.donutChartData = [
      ["TODO", "Quantity"],
      ["Completed", 11],
      ["Pending", 9],
      ["Deleted", 2],
    ];
  }
  ngOnInit() {}
}
