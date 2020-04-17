import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsPageComponent } from './achievements-page.component';

describe('AchievementsPageComponent', () => {
  let component: AchievementsPageComponent;
  let fixture: ComponentFixture<AchievementsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
