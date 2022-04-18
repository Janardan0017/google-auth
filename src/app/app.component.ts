import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("signIn", { static: true }) signIn: ElementRef;
  // @ViewChild("signOut", { static: true }) signOut: ElementRef;
  accessToken: any = '';

  constructor() {}

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        response_type: 'code',
        // gmail client id
        client_id: '389958344589-hku2pajkfl594v36ppjgh7h1nc9m7t51.apps.googleusercontent.com',

        // calender client id
        //client_id: '436151732083-950pdvq4rduai721kcqhpkvgnvt9udpo.apps.googleusercontent.com',
        
        cookiepolicy: 'single_host_origin',
        scope: 'https://mail.google.com/',
        //scope: 'https://www.googleapis.com/auth/calendar',
        access_type: 'offline',
        include_granted_scopes: true,
        hd: 'finoit.co.in',
        authUser: 'janardan.ft@gmail.com'
      });
      // this.attachSignin(document.getElementById('googleBtn'));
      fromEvent(this.signIn.nativeElement, "click").subscribe(() =>
        this.auth2.grantOfflineAccess().then(this.signInCallback.bind(this))
      );
    });
  }

  signInCallback(authResult: any) {
    this.accessToken = authResult.code;
    console.log(authResult.code);
  }


  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit(): void {
  }

  res = ''
  getData() {
    this.res = this.accessToken
  }
}
