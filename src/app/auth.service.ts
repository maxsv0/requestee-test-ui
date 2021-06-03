import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private gapiSetup = false;
  private authInstance: any;
  private user: any;

  constructor() {

  }

  getUser(): gapi.auth2.GoogleUser {
    return this.user;
  }

  async logout(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      this.authInstance.signOut();
      this.authInstance.disconnect();
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
          (x: any) => this.user = x);
    });
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    console.log(pload);

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({client_id: environment.gAPI.client_id, scope: 'https://www.googleapis.com/auth/admin.directory.user.readonly'})
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }
}
