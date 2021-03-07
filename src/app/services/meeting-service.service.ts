import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meeting } from '../Model/meeting';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MeetingServiceService {
  mymeetings: Meeting [] = [];

  meetingsSubject= new Subject<Meeting[]>();

  constructor() { }

  addMeeting(){
    this.meetingsSubject.next(this.mymeetings);

  }

  saveMeetings(){
    firebase.database().ref('/mymeetings').set(this.mymeetings);

  }



  getMeetings(){
    firebase.database().ref('/mymeetings').on('value', (data) => {
      this.mymeetings= data.val() ? data.val() : [];
      this.addMeeting();
    });
  }

  getSingleMeeting(id){
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/mymeetings/' + id).once('value').then(
          (data) => {
            resolve(data.val());

          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }


  createMeeting(meeting: Meeting){
    this.mymeetings.push(meeting);
    this.saveMeetings();
    this.addMeeting();


  }

  deleteMeeting(index){

    this.mymeetings.splice(index,1);
    this.saveMeetings();
    this.addMeeting();
  }


  updateMeeting(meeting : Meeting, index){
    
     firebase.database().ref('/mymeetings/' + index ).update(meeting).catch(
       (error) => {
         console.error(error);

       }
     );
    
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqueId= Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload= firebase.storage().ref().child('images/mymeetings/'+  fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log('Chargement....');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );

          }
          );

      }
    );

  }


    removeFile(fileLink: string){
      if (fileLink){
        const storageRef= firebase.storage().refFromURL(fileLink);
        storageRef.delete().then(
          () => {
            console.log('File deleted');
          }
        ).catch(
          (error) => {
            console.error(error);

          }
        );
      }
    }

  }

