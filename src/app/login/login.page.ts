import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }
  ngOnInit(): void {

    // initialisation du formulaire

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

  }

  goto(url: string) {
    this.navCtrl.navigateForward(url);
  }

  goBack() {
    this.navCtrl.back();
  }

  //sauvegarder les données
  saveData(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  login() {
    // recuperation des données du formulaires
    let formdata: any = this.loginForm.value;
    //verification des données dans le localstorage
    if (localStorage.getItem('dataUser')) {
      let datauser: any = localStorage.getItem('dataUser');
      datauser = JSON.parse(datauser);
      // comparaison des identifiants
      if (formdata.email == datauser.email && formdata.password == datauser.password) {
        this.router.navigate(['/home']);
      }
      else {
        this.create_toast('Désolé, identidiants incorrects');
      }
    }
    else {
      this.create_toast('Votre compte n\'existe pas');
    }

  }

 // creation d'une notification interne 
  async create_toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });

    await toast.present();
  }

}



