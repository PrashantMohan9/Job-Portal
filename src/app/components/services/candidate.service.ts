import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Job } from '../../models/job.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + "/job");
  }

  getAppliedJobs(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + "/job/candidate");
  }

  ApplyJob(Id:any): Observable<any> {
    const JobId = {
      jobId: Id
    };
    return this.http.post<any>(environment.baseUrl + "/job/applyjob", JobId);
  }
}
