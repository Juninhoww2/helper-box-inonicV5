import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpMessageService } from '../../services/alert.service';
import { User } from '../dtos/IUser';
import { AuthenticationService } from '../../services/authentication.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: Observable<firebase.User>;
  isLogged: any = false;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private popUpService: PopUpMessageService,
    private gplus: GooglePlus,
    private platform: Platform,
    private authFire: AngularFireAuth,
    private facebook: Facebook) {
    this.user = this.authFire.authState;
  }

  ngOnInit() {
  }

  async userLogin(formUser: User) {
    const user = await this.authentication.loginUser(formUser);

    if (user) {
      this.authentication.isLogged = true;
      this.router.navigateByUrl('/dashboard');
      return;
    }

    this.popUpService.presentAlert('Erro ao fazer login, verifique suas credenciais');
  }

  /* Login com Gmail */
  async userLoginGoogle() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
      return;
    }

    this.webGoogleLogin();
  }

  /* Login com Gmail pelo Android ou iOS */
  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const gPlusUser = await this.gplus.login({
        'webClientId': 'your-web-client-id',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.authFire.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
      );
    } catch (err) {
      this.popUpService.presentAlert('Ocorreu um erro ao fazer login, tente novamente');
    }
  }

  /* Popup tela de redirecionamento do Google */
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.authFire.signInWithPopup(provider);
      this.router.navigateByUrl('/dashboard');

    } catch (err) {
      this.popUpService.presentAlert('Algo inesperado aconteceu, tente novamente !');
    }
  }

  /* Signout Gmail */
  signOut() {
    this.authFire.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
      return;
    }
  }

  loginFacebook(): void {
    if (this.platform.is('cordova')) {
      this.nativeFacebookAuth();
    } else {
      this.browserFacebookAuth();
    }
  }

  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach(data => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          return true;
        }
      });
    }

    return false;
  }

  /* Login facebook pelo android ou iOS */
  async nativeFacebookAuth(): Promise<void> {
    try {
      const response = await this.facebook.login(["public_profile", "email"]);

      if (response.authResponse) {

        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();

          if (!this.isUserEqual(response.authResponse, firebaseUser)) {

            const credential = firebase.auth.FacebookAuthProvider.credential(
              response.authResponse.accessToken
            );

            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(error => {
                console.log(error);
              });
          }
        });
      } else {
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }

  /* Login facebook pelo browser */
  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      this.router.navigateByUrl('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }



}
