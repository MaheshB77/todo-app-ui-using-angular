import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Todo } from "src/app/models/todo.model";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  userFirstName: string;
  userLastName: string;
  email: string;
  password: string;
  error: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  onSubmit(userForm: NgForm) {
    if (!userForm.valid) {
      this.error = true;
    } else {
      this.error = false;
      let todos: Todo[] = [];
      let user: User = new User(this.userFirstName, this.userLastName, this.email, this.password, todos);
      this.userService.signUp(user);
    }
  }
}
