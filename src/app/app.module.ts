import { BrowserModule } from "@angular/platform-browser";
import {
  AmexioChartsModule,
  AmexioDashBoardModule,
  AmexioEnterpriseModule,
  AmexioMapModule,
  AmexioWidgetModule,
} from "amexio-ng-extensions";
// import { AmexioChartD3Module } from "amexio-chart-d3";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TodoListComponent } from "./components/todos/todo-list/todo-list.component";
import { TodoEditComponent } from "./components/todos/todo-edit/todo-edit.component";
import { TodosComponent } from "./components/todos/todos.component";
import { HeaderComponent } from "./components/header/header.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { FormsModule } from "@angular/forms";
import { RoutingModule } from "./modules/routing/routing.module";
import { ErrorComponent } from "./components/error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoEditComponent,
    TodosComponent,
    HeaderComponent,
    StatisticsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmexioChartsModule,
    AmexioDashBoardModule,
    AmexioEnterpriseModule,
    AmexioMapModule,
    AmexioWidgetModule,
    RoutingModule,
    HttpClientModule,
    // AmexioChartD3Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
