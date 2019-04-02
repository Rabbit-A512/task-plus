import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsOwnedComponent } from './groups-owned.component';

describe('GroupsOwnedComponent', () => {
  let component: GroupsOwnedComponent;
  let fixture: ComponentFixture<GroupsOwnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsOwnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
