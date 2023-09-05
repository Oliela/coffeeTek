import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataUser={
    email : '',
    password :''
  };
  loginForm!: FormGroup ;
  
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {

    // initialisation du formulaire

    this.loginForm = new FormGroup({
      email : new FormControl('',Validators.required),
      password : new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]))
    });
   
  }

  goto(url: string){
    this.navCtrl.navigateForward(url);
  }

  goBack(){
    this.navCtrl.back();
  }

  //sauvegarder les données
  saveData(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  login(){
    // console.log(this.dataUser.email);
    // console.log(this.dataUser.password);

    //console.log(this.loginForm.value);

    var datauser = JSON.stringify(this.loginForm.value);

    // console.log(datauser);
    this.saveData('dataUser', datauser);

  }
  // recuperer les données
  getData(key: string) {
    return localStorage.getItem(key);
  }

  getdata(){
   const datauser= this.getData('dataUser');

   console.log(datauser);
  }
  

}
