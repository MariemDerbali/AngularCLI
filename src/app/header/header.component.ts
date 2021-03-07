import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import firebase from 'firebase';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

title ='Meetings-app';

isLoggedIn= false;


  constructor(
    private AuthenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        console.log('userSession', userSession);
        if(userSession){
          this.isLoggedIn= true;
        }else{
          this.isLoggedIn=false;
          


        }


      }
    );
  }

  onSignOut(){

    this.AuthenticationService.signOutUser();
  }

  

}
