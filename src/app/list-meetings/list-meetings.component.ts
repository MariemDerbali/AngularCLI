import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MeetingServiceService} from '../services/meeting-service.service';

@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.css']
})
export class ListMeetingsComponent implements OnInit, OnDestroy {
  mymeetings= [];
  meetingsSubscription: Subscription;
  titre:string;

  
  constructor(
    private MeetingServiceService: MeetingServiceService
  ) { }
  

  ngOnInit(){
    this.meetingsSubscription= this.MeetingServiceService.meetingsSubject.subscribe(
      (data:any) =>{
        
        this.mymeetings=data;
      }
    );
    this.MeetingServiceService.addMeeting();
    this.MeetingServiceService.getMeetings();
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
  

  getJoinValue(index){
    if (this.mymeetings[index].join){
      return 'red';
    }else{
      return 'green';
    }

  }
  ngOnDestroy(){
    this.meetingsSubscription.unsubscribe();
  }

  

}
