import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentTodoFormComponent } from './add-parent-todo-form.component';

describe('AddParentTodoFormComponent', () => {
  let component: AddParentTodoFormComponent;
  let fixture: ComponentFixture<AddParentTodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentTodoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
