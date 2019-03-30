import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTodoCardComponent } from './sub-todo-card.component';

describe('TodoCardComponent', () => {
  let component: SubTodoCardComponent;
  let fixture: ComponentFixture<SubTodoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubTodoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTodoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
