import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import UserWithToken from "../models/user-with-token.model";
import { UserService } from "./user.service";


@Injectable({
    providedIn: "root"
})
export class TodoResolver implements Resolve<Observable<UserWithToken>> {

    constructor(private userService: UserService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserWithToken> {
        return this.userService.getUserLoginObservable();
    }

}