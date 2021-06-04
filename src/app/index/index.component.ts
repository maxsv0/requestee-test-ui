import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentToken().subscribe(token => {
      if (token !== null && token !== '') {
        console.log('Token = ' + token);
        this.router.navigate(['./home']);
      }
    });
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
