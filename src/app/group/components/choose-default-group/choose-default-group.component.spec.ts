import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDefaultGroupComponent } from './choose-default-group.component';

describe('ChooseDefaultGroupComponent', () => {
  let component: ChooseDefaultGroupComponent;
  let fixture: ComponentFixture<ChooseDefaultGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDefaultGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDefaultGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
