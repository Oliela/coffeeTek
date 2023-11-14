import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  dataUser={
    email : '',
    password :''
  };

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  getdata(){
   const datauser= this.getData('dataUser');

   console.log('page home:')
   console.log(datauser);
  }

  goto(url: any){
    this.navCtrl.navigateForward(url);
 }


  removeData(){
    localStorage.removeItem('session');
    this.goto('/tabs/tab1');
  }



}
