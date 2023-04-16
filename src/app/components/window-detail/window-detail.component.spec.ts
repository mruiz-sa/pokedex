import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDetailComponent } from './window-detail.component';

describe('WindowDetailComponent', () => {
  let component: WindowDetailComponent;
  let fixture: ComponentFixture<WindowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
