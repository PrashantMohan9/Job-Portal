import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { CandidatePageComponent } from './components/candidate-page/candidate-page.component';
import { RecruiterPageComponent } from './components/recruiter-page/recruiter-page.component';
import { AuthGuard } from "./components/services/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path:'landing', component:LandingPageComponent },
  { path:'signup', component:SignupPageComponent },
  { path:'candidate', component:CandidatePageComponent, canActivate: [AuthGuard] },  //Only protecting these two routes 
  { path:'recruiter', component:RecruiterPageComponent, canActivate: [AuthGuard] }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }