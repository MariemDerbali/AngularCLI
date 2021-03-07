import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../Model/meeting';
import { MeetingServiceService } from '../services/meeting-service.service';

@Component({
  selector: 'app-details-meeting',
  templateUrl: './details-meeting.component.html',
  styleUrls: ['./details-meeting.component.css']
})
export class DetailsMeetingComponent implements OnInit {
  
  meet: Meeting;

  constructor(
    private route: ActivatedRoute,
    private MeetingServiceService: MeetingServiceService


  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.MeetingServiceService.getSingleMeeting(id).then(
      (meet: Meeting) => {
        this.meet = meet;

      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}
