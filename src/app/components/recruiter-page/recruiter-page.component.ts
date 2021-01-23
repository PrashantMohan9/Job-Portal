import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RecruiterService } from '../services/recruiter.service';

@Component({
  selector: 'app-recruiter-page',
  templateUrl: './recruiter-page.component.html',
  styleUrls: ['./recruiter-page.component.css']
})
export class RecruiterPageComponent implements OnInit {
  Username:string;
  Jobposted:any;
  NoJobPosted:boolean;
  showModal:boolean;
  CandidateInfo:any;

  constructor(private router: Router, public authService: AuthService, public recruiterService: RecruiterService) { }

  ngOnInit(): void {
    this.Username=localStorage.getItem('UserName');

    //Get Jobs posted by particular recruiter
    this.recruiterService.getJob().toPromise()
      .then(data => {
        this.Jobposted = data.job;
      });
    //this.updateJob();
  }

  updateJob() {
    this.recruiterService.getJob()
      .subscribe(data => {
        this.Jobposted = data.job;
      });  
    }

  //To post new Job
  onSubmit(form:NgForm) {
    if(form.invalid) {
      alert("Please Enter the Missing Field")
      return;
    }
    this.recruiterService.postJob(form.value.title, form.value.description)
      .subscribe(_ => {
        this.updateJob()
        form.reset();
      }); 

  }

  //Get Candidates who have applied to that job
  getCandidates(jobId) {
    
    this.recruiterService.getCandidate(jobId).toPromise()
      .then(data => {
        this.CandidateInfo = data.user;
        this.showModal=true;
      });
  }

  closeModal() {
    this.CandidateInfo=null;    //Just to clear previous data
  }

  onLogout(){
    this.authService.logout();
  }

}


// form.resetForm();
//     alert("Job Posted");
//     this.recruiterService.getJob().subscribe(data => {
//         this.Jobposted = data.job;
//     });  
