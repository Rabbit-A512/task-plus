import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndistributedTasksComponent } from './undistributed-tasks.component';

describe('UndistributedTasksComponent', () => {
  let component: UndistributedTasksComponent;
  let fixture: ComponentFixture<UndistributedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndistributedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndistributedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
