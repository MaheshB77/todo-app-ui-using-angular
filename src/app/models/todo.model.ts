export class Todo {
  public todoId: number;
  public todoTitle: string;
  public todoStatus: string;
  constructor(todoId: number, todoTitle: string, todoStatus: string) {
    this.todoId = todoId;
    this.todoTitle = todoTitle;
    this.todoStatus = todoStatus;
  }
}
