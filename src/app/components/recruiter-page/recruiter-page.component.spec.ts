import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPageComponent } from './recruiter-page.component';

describe('RecruiterPageComponent', () => {
  let component: RecruiterPageComponent;
  let fixture: ComponentFixture<RecruiterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
