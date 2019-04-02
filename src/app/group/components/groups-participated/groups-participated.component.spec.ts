import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsParticipatedComponent } from './groups-participated.component';

describe('GroupsParticipatedComponent', () => {
  let component: GroupsParticipatedComponent;
  let fixture: ComponentFixture<GroupsParticipatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsParticipatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsParticipatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
