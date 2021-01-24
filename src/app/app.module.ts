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

import { AppComponent } from "./app.component";
import { TodoListComponent } from "./components/todos/todo-list/todo-list.component";
import { TodoEditComponent } from "./components/todos/todo-edit/todo-edit.component";
import { TodosComponent } from "./components/todos/todos.component";
import { HeaderComponent } from "./components/header/header.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoEditComponent,
    TodosComponent,
    HeaderComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmexioChartsModule,
    AmexioDashBoardModule,
    AmexioEnterpriseModule,
    AmexioMapModule,
    AmexioWidgetModule,
    // AmexioChartD3Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
