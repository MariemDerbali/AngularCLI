import { Component } from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mymeetingsapp';
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyAK4Na9gE7mHu7aKp019k7jD0hnEXNRyQ4",
      authDomain: "mymeetings-3511d.firebaseapp.com",
      projectId: "mymeetings-3511d",
      storageBucket: "mymeetings-3511d.appspot.com",
      messagingSenderId: "6858748573",
      appId: "1:6858748573:web:3d8d15078bf191e4891a74"
    };
    firebase.initializeApp(firebaseConfig);
  }
 

  


  
}
