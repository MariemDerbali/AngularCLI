import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MeetingServiceService } from 'src/app/services/meeting-service.service';
import * as $ from 'jquery';
import { Meeting } from 'src/app/Model/meeting';

@Component({
  selector: 'app-admin-meetings',
  templateUrl: './admin-meetings.component.html',
  styleUrls: ['./admin-meetings.component.css']
})

export class AdminMeetingsComponent implements OnInit {

  meetingsForm: FormGroup;
  meetingsSubscription: Subscription;
  mymeetings: Meeting [] = [];
  titre:string;

  indexToRemove;
  indexToUpdate;
  editMode=false;

  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[] = []



  constructor(
    private formBuilder: FormBuilder,
    private MeetingServiceService: MeetingServiceService
  ) { }

  ngOnInit(){
    this.initMeetingsForm();
    this.MeetingServiceService.meetingsSubject.subscribe(
      (data: Meeting []) =>{
        this.mymeetings=data;
      }
    );
    this.MeetingServiceService.getMeetings();
    this.MeetingServiceService.addMeeting();


  }

  initMeetingsForm(){
    this.meetingsForm= this.formBuilder.group({
      titre: ['',Validators.required],
      date_deb: ['',Validators.required],
      date_fin: ['',Validators.required],
      lieu: ['',Validators.required],
      join:''

    });

  }
  
  Search(){
    if(this.titre!=""){
      this.mymeetings=this.mymeetings.filter(res =>{
        return res.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      });
    }else{
      this.ngOnInit();
    }
  }



  onSubmitMeetingsForm(){
    const newMeeting: Meeting = this.meetingsForm.value;
    newMeeting.join= this.meetingsForm.get('join').value ? this.meetingsForm.get('join').value : false;
    newMeeting.photos = this.photosAdded ? this.photosAdded : [];
    if(this.editMode){
      this.MeetingServiceService.updateMeeting(newMeeting,this.indexToUpdate);

    }
    else{
      this.MeetingServiceService.createMeeting(newMeeting);
    }
    $('#meetingsFormModal').modal('hide');
   

  }

  resetForm(){
    this.editMode=false;
    this.meetingsForm.reset();
    this.photosAdded= [];
  }

  onDeleteMeeting(index){
    $('#deleteMeetingModal').modal('show');
    this.indexToRemove=index;
   }

  onConfirmDeleteMeeting(){
    this.mymeetings[this.indexToRemove].photos.forEach(
      (photo) => {
        this.MeetingServiceService.removeFile(photo);
      }
    );
    this.MeetingServiceService.deleteMeeting(this.indexToRemove);
    $('#deleteMeetingModal').modal('hide');

  }


  onEditMeeting(meet: Meeting){
    this.editMode=true;
    $('#meetingsFormModal').modal('show');
    this.meetingsForm.get('titre').setValue(meet.titre);
    this.meetingsForm.get('date_deb').setValue(meet.date_deb);
    this.meetingsForm.get('date_fin').setValue(meet.date_fin);
    this.meetingsForm.get('lieu').setValue(meet.lieu);
    this.meetingsForm.get('join').setValue(meet.join);
    this.photosAdded= meet.photos ? meet.photos : [];


    const index=this.mymeetings.findIndex(
      (meetingEl)=>{
        if(meetingEl==meet){
          return true;
        }
      }
    );

    this.indexToUpdate= index;

  }



  onUploadFile(event){
    this.photoUploading = true;
    
    this.MeetingServiceService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);

      }
    );

  }

  onRemoveAddedPhoto(index){
    this.MeetingServiceService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);

  }


}
