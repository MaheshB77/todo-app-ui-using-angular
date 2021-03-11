import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  userLogin: UserLogin;
  jwtToken: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    this.userLogin = new UserLogin(loginForm.value.email, loginForm.value.password);
    this.userService.login(this.userLogin);
  }
}
