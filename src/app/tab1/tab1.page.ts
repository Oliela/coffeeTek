import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  dataUser={
    email : '',
    password :''
  };

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }

  goto(url: any){
     this.navCtrl.navigateForward(url);
  }

  //récupérer les données
  getData(key: string) {
    return localStorage.getItem(key)!;
  }

  getdata(){
    var dataUser= JSON.parse(this.getData("dataUser"));

    this.dataUser = dataUser;
   
   //console.log(dataUser.email);
  }

  autentificate(){

    // this.getdata();

    // if(this.dataUser?.email){
      
    //   this.goto('/home');
    //   console.log( 'session ouverte '); 
    // }
    // else{
    //   this.goto('/welcom');
    //   console.log( 'aucune session ouverte ');
    // }

  
     //Récupérer des données dans le localstorage
     if (localStorage.getItem('dataUser')) {
       let datauser: any = localStorage.getItem('dataUser');
       datauser = JSON.parse(datauser);
       // comparaison des identifiants
       if (datauser.email && datauser.password) {
         this.router.navigate(['/home']);
       }
       else {
        this.router.navigate(['/welcom']);
       }
     }
     else {
      this.router.navigate(['/welcom']);
     }
  }


}
