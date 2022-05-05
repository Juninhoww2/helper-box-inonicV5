import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpMessageService } from '../../services/alert.service';
import { User } from '../dtos/IUser';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private popUpService: PopUpMessageService
  ) { }

  ngOnInit() { }

  async createUser(formUser: User) {
    console.log(formUser.email, formUser.password);

    const user = await this.authentication.registerUser(formUser);

    if (user) {
      this.popUpService.presentAlert('Usuário criado com sucesso !');
      this.router.navigateByUrl('/');
      return;
    }

    this.popUpService.presentAlert('Erro ao fazer o cadastro, tente novamente !');
  }



}
