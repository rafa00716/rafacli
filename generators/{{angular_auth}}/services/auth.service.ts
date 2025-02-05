import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  LoginPayloadInterface,
  LoginSuccessResponse,
} from '../models/login.model';
import { environment } from '../../../environments/environments';
import { LoggedProfile } from '../models/profile.model';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CreatePasswordInterface } from '../models/create-password.model';
import { routes } from '../iam-routing.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.url;
  private urlAuth = this.url + '/auth';
  private token!: string;
  currentUser: WritableSignal<LoggedProfile | undefined | null> =
    signal(undefined);

  constructor(private http: HttpClient, private router: Router) {
    const authViews = routes
      .filter((r) => r.path !== '')
      .map((r) => r.path?.split('/')[0]);

    const currentView = this.router.url.split('/')[2];

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      this.logout(!authViews.includes(currentView));
      return;
    }

    this.token = accessToken;
  }

  resetPassword(email: string) {
    return this.http.patch(`${this.urlAuth}/reset-password/${email}`, null);
  }

  createPassword(createPasswordPayload: CreatePasswordInterface) {
    return this.http.post(
      `${this.urlAuth}/create-password`,
      createPasswordPayload
    );
  }

  async login(loginPayload: LoginPayloadInterface): Promise<LoggedProfile> {
    const loginResp: LoginSuccessResponse = await firstValueFrom(
      this._login(loginPayload)
    );
    this.token = loginResp.access_token;
    localStorage.setItem('access_token', this.token);
    return await firstValueFrom(this.getProfile());
  }

  private _login(
    loginPayload: LoginPayloadInterface
  ): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(
      this.urlAuth + '/login',
      loginPayload
    );
  }

  navigateLogin() {
    this.router.navigate(['auth/login']);
  }

  logout(navigateLogin: boolean = true) {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);

    if (navigateLogin) {
      this.navigateLogin();
    }
  }

  getToken() {
    return this.token;
  }
  getProfile(): Observable<LoggedProfile> {
    return this.http.get<LoggedProfile>(this.urlAuth + '/profile').pipe(
      tap({
        next: (profile) => {
          this.currentUser.set(profile);
        },
        error: (err) => {
          console.log({ err });
          this.logout();
        },
      })
    );
  }
}
