import { Injectable } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class PopUpMessageService {

    constructor(
        private alertController: AlertController) { }


    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            header: '',
            subHeader: '',
            message,
            buttons: ['OK']
        });
        await alert.present();
    }
}
