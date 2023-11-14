import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  userData!:any;
  


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastController: ToastController
  ) { }


  ngOnInit(){

    // initialisation du formulaire

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-z]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });

  }

  get name (){
    return this.registerForm.get('name');
   }
  get email (){
   return this.registerForm.get('email');
  }
  get password (){
    return this.registerForm.get('password');
   }

  // changer de page 
  goto(url: string) {
    this.navCtrl.navigateForward(url);
  }

  // bouton retour
  goBack() {
    this.navCtrl.back();
  } 

  //sauvegarder les données
  saveData(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  register() {
    // recuperation des données du formulaires
    let formdata: any = this.registerForm.value;
    
    //verification des données dans le localstorage
    if (localStorage.getItem('userData')) {
      let data: any = localStorage.getItem('userData');
      data = JSON.parse(data);
      // comparaison des identifies dans le tableau register 
      if (formdata.email == data.email) {
        this.create_toast('L \'adresse mail est déjà utilisée pour un autre compte!');
      }
      else {  
        let formdata: any = JSON.stringify(this.registerForm.value);
        this.saveData('userData',formdata);
        this.saveData('session',formdata);
        this.create_toast('Votre compte a été créer!');
      }
    }
    else {  
      let formdata: any = JSON.stringify(this.registerForm.value);
      this.saveData('userData', formdata);
      this.saveData('session',formdata);
      this.create_toast('Votre compte a été créer!');

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
