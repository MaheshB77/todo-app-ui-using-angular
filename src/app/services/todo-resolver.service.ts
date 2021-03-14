import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Todo } from "../models/todo.model";
import UserWithToken from "../models/user-with-token.model";
import { DataService } from "./data.service";
import { UserService } from "./user.service";


@Injectable({
    providedIn: "root"
})
export class TodoResolver implements Resolve<Observable<UserWithToken>> {

    constructor(private dataService: DataService, private userService: UserService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userService.userWithToken;
    }

}