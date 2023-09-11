import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  registerForm!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }
  ngOnInit(): void {

    // initialisation du formulaire

    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
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

  register() {
    // recuperation des données du formulaires
    let formdata: any = JSON.stringify(this.registerForm.value);
    //verification des données dans le localstorage
    if (localStorage.getItem('dataRegister')) {
      let datauser: any = localStorage.getItem('dataRegister');
      datauser = JSON.parse(datauser);
      // comparaison des identifiants
      if (formdata.email !== datauser.email && formdata.password !== datauser.password) {
        this.create_toast('Ce compte existe déjà');
         console.log('Ce compte existe déjà');
      }
      else {
        this.create_toast('Désolé, identidiants incorrects');
        console.log(datauser);
      }
    }
    else {
      this.saveData('dataRegister',formdata);
      this.saveData('dataUser',formdata);
      this.create_toast('Votre compte a été créer avec succès!');
      console.log('Votre compte a été créer avec succès!');
      this.router.navigate(['/home']);
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
