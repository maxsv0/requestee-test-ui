import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GSuiteUser} from "./model/gsuite-user";
import {BehaviorSubject, Observable} from "rxjs";
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private gapiSetup = false;
  private authInstance: GoogleAuth = undefined!;
  private user: any;
  private error: any;

  // user token that is used to call API
  private currentToken: Observable<string>;
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token')  || '');
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  getGSuiteUsers(token: string) {
    let params = new HttpParams().set('token', token);

    console.log('now doConnect');

    return this.http.get<GSuiteUser[]>('https://requestee-test.ew.r.appspot.com/connect', {params: params});
  }

  public getCurrentToken(): Observable<string> {
    return this.currentToken;
  }

  public get currentTokenValue(): string {
    if (this.currentTokenSubject.value && Object.entries(this.currentTokenSubject.value).length !== 0) {
      return this.currentTokenSubject.value;
    } else {
      return '';
    }
  }

  getUser(): gapi.auth2.GoogleUser {
    return this.user;
  }

  async logout(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    localStorage.setItem('token', '');
    this.currentTokenSubject.next('');

    // Resolve or reject signin Promise
    return new Promise(async () => {
      this.authInstance.signOut();
      this.authInstance.disconnect();
    });
  }

  async authenticate() : Promise<void>{

    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {
          this.user = user;
          let token = this.user.getAuthResponse().access_token;

          localStorage.setItem('token', token);
          this.currentTokenSubject.next(token);
        },
        error => this.error = error);
    });
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

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
