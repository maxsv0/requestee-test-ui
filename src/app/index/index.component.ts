import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  getUser() {
    return this.authService.getUser();
  }

  login() {
    this.authService.authenticate();
  }

  logout() {
    this.authService.logout();
  }

}
