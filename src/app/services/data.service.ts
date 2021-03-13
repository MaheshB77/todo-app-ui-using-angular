import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/todo.model";
import UserWithToken from "../models/user-with-token.model";


@Injectable({
    providedIn: "root"
})
export class DataService {
    jwtToken = new Subject<string>();
    todos = new Subject<Todo[]>();
    userWithToken = new Subject<UserWithToken>();

    updateToken(jwtToken: string) {
        this.jwtToken.next(jwtToken);

        // Saving jwtToken to the browser local storage
        this.jwtToken.subscribe((jwtToken) => {
            localStorage.setItem("jwtToken", jwtToken);
        })
    }

    updateTodos(todos: Todo[]) {
        this.todos.next(todos);

        // Saving todos to the browser local storage
        this.todos.subscribe((todos) => {
            localStorage.setItem("todos", JSON.stringify(todos));
        })
    }

    updateUserWithToken(userWithToken: UserWithToken) {
        this.userWithToken.next(userWithToken);

        // Saving userWithToken to the browser storage
        this.todos.subscribe((userWithToken) => {
            localStorage.setItem("userWithToken", JSON.stringify(userWithToken));
        })
    }

    getJwtToken(): string {
        // let currentJwtToken: string;
        // this.jwtToken.subscribe((jwtToken) => {
        //     currentJwtToken = jwtToken;
        // });
        // return currentJwtToken;

        let currentJwtToken: string;
        currentJwtToken = localStorage.getItem("jwtToken");
        return currentJwtToken;
    }

    getTodos(): Todo[] {
        // let currentTodos: Todo[];
        // this.todos.subscribe((todos) => {
        //     currentTodos = todos;
        // });
        // return currentTodos;

        let currentTodos: Todo[];
        currentTodos = JSON.parse(localStorage.getItem("todos"));
        return currentTodos;
    }

    getUserWithTodos(): UserWithToken {
        // let currentUserWithToken: UserWithToken;
        // this.userWithToken.subscribe((userWithToken) => {
        //     currentUserWithToken = userWithToken;
        // });
        // return currentUserWithToken;

        let currentUserWithToken: UserWithToken;
        currentUserWithToken = JSON.parse(localStorage.getItem("userWithToken"));
        return currentUserWithToken;
    }
}