import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin(form: NgForm){
    if(form.invalid) {
      alert("Please Enter Correct Data")
      return;
    }

    this.authService.login(form.value.email, form.value.password);
  }
}
