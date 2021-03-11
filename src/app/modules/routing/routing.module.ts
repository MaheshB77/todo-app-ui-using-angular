import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "src/app/components/todos/todos.component";
import { StatisticsComponent } from "src/app/components/statistics/statistics.component";
import { TodoEditComponent } from "src/app/components/todos/todo-edit/todo-edit.component";
import { ErrorComponent } from "src/app/components/error/error.component";
import { UserComponent } from "src/app/components/user/user.component";
import { LoginComponent } from "src/app/components/user/login/login.component";
import { SignupComponent } from "src/app/components/user/signup/signup.component";

const appRoutes: Routes = [
  { path: "", component: UserComponent },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "signin", component: LoginComponent },
      { path: "signup", component: SignupComponent },
    ],
  },
  {
    path: "todos",
    component: TodosComponent,
    children: [
      { path: "edit", component: TodoEditComponent },
      { path: ":id/edit", component: TodoEditComponent },
    ]
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
