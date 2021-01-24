import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "src/app/components/todos/todos.component";
import { StatisticsComponent } from "src/app/components/statistics/statistics.component";
import { TodoEditComponent } from "src/app/components/todos/todo-edit/todo-edit.component";
import { ErrorComponent } from "src/app/components/error/error.component";

const appRoutes: Routes = [
  { path: "", component: TodosComponent },
  {
    path: "todos",
    component: TodosComponent,
    children: [
      { path: "edit", component: TodoEditComponent },
      { path: ":id/edit", component: TodoEditComponent },
    ],
  },
  { path: "stats", component: StatisticsComponent },
  { path: "error-page", component: ErrorComponent },
  { path: "**", redirectTo: "error-page" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}
