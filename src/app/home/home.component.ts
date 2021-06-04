import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {GSuiteUser} from "../model/gsuite-user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gSuiteUsers: GSuiteUser[] = [];
  gSuiteMFAPassed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentToken().subscribe(token => {
      if (token !== null && token !== '') {

        this.authService.getGSuiteUsers(token)
          .subscribe(data => {
            let users:GSuiteUser[] = [];
            let gSuiteMFAPassed = true;

            for (let user of data) {
              if (!user.isEnrolledIn2Sv) {
                gSuiteMFAPassed = false;
                users.push(user);
              }
            }

            this.gSuiteUsers = users;
            this.gSuiteMFAPassed = gSuiteMFAPassed;
          });
      } else {
        console.log('go /==');
        this.router.navigate(['./']);
      }
    });
  }

  getGSuiteUsers() {
    return this.gSuiteUsers;
  }

  disconnect() {
    this.authService.logout();
  }
}
