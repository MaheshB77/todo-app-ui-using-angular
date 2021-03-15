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

  constructor(private dataService: DataService, private userService: UserService) {
    
    // To set isLoggedIn true after login
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      if(isLoggedIn) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit() {}

  logout() {
    console.log("Logout clicked");
    this.userService.logout();
  }
}
