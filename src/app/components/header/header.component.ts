import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isShowing: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.checkIfUserLoggedIn();
  }

  // Logut the user
  logout() {
    this.userService.logout();
  }

  // To check the user is logged in or not
  checkIfUserLoggedIn() {
    // Check if jwt token is present in local storage
    if (this.dataService.getJwtToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    // Check if user just logged in via isLoggedIn Subject of data service
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
