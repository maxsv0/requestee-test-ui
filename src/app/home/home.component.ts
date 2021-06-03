import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {GSuiteUser} from "../model/gsuite-user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private gSuiteUsers: GSuiteUser[] = [];

  constructor(
    private authService: AuthService
  ) {
    this.authService.getGSuiteUsers().subscribe((data: GSuiteUser[]) => this.gSuiteUsers = data);
  }

  ngOnInit(): void {
  }

  getGSuiteUsers() {
    return this.gSuiteUsers;
  }

  disconnect() {
    this.authService.logout();
  }

}
