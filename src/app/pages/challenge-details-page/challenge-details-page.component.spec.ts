import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsPageComponent } from './challenge-details-page.component';

describe('ChallengeDetailsPageComponent', () => {
  let component: ChallengeDetailsPageComponent;
  let fixture: ComponentFixture<ChallengeDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
