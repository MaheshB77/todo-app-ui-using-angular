import { Todo } from "./todo.model";

export class User {
    id?: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    password: string;
    userTodos: Todo[];
    constructor(userFirstName: string, userLastName: string, userEmail: string, password: string, userTodos: Todo[]) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userTodos = userTodos;
        this.password = password;
    }
}