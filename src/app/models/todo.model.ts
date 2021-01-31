export class Todo {
  public todoId: string;
  public todoTitle: string;
  public todoStatus: string;
  constructor(todoId: string, todoTitle: string, todoStatus: string) {
    this.todoId = todoId;
    this.todoTitle = todoTitle;
    this.todoStatus = todoStatus;
  }
}
