import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.css']
})
export class CandidatePageComponent implements OnInit {
  Username:string;
  AllJobs:any;
  AppliedJobs:any;

  constructor(private router: Router, public authService: AuthService, public candidateService:CandidateService) { }

  ngOnInit(): void {
    this.Username=localStorage.getItem('UserName');
    this.getJobs();
  }

  //Same Function with promise written at the end
  getJobs() {
    this.candidateService.getAllJobs()
      .subscribe( Alldata => {
        this.AllJobs=Alldata;         //Get All Posted Jobs

        this.candidateService.getAppliedJobs().subscribe(Applieddata => {
        this.AppliedJobs = Applieddata.job;    //Get Jobs Applied By that Candidate
        console.log(this.AppliedJobs);

          for( var i= 0; i<this.AllJobs.length; i++){
            for( var j=0; j<this.AppliedJobs.length; j++){
                if((this.AllJobs[i]._id == this.AppliedJobs[j]._id)){
                 this.AllJobs.splice(i, 1);
               }
             }
         }
         JSON.stringify(this.AllJobs);
        })
      })
  }

  ApplyJob(id){
    this.candidateService.ApplyJob(id)
      .subscribe(data => {
        this.getJobs();
      })
  }

  onLogout(){
    this.authService.logout();
  }

}



  // getJobs() {
  //   this.candidateService.getAllJobs().toPromise()
  //   .then(Alldata => {
  //     this.AllJobs=Alldata;         //Get All Posted Jobs

  //     this.candidateService.getAppliedJobs().toPromise()
  //     .then(Applieddata => {
  //       this.AppliedJobs = Applieddata.job;    //Get Jobs Applied By that Candidate
  //       console.log(this.AppliedJobs);
  
  //         for( var i= 0; i<this.AllJobs.length; i++){
  //           for( var j=0; j<this.AppliedJobs.length; j++){
  //               if((this.AllJobs[i]._id == this.AppliedJobs[j]._id)){
  //                this.AllJobs.splice(i, 1);
  //              }
  //            }
  //        }
  //        JSON.stringify(this.AllJobs);
  //       })
  //   })
  // }
