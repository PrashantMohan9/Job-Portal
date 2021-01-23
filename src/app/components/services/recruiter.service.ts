import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Job } from '../../models/job.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  constructor(private http: HttpClient) { }

  getJob(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + "/job/recruiter/");
  }

     
  postJob(title:string, description:string): Observable<any> {
    const job: Job = {
      email:localStorage.getItem('email'),
      title:title,
      description:description
    };

    return this.http.post<any>(environment.baseUrl + "/job", job);
  }

  getCandidate(job_Id){
    const job={
      jobId:job_Id
    }

    return this.http.post<any>(environment.baseUrl +"/job/getcandidates", job);
  }

}
