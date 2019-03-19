import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';

import { DashboardTestComponent } from './dashboard-test.component';

describe('DashboardTestComponent', () => {
  let component: DashboardTestComponent;
  let fixture: ComponentFixture<DashboardTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTestComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
