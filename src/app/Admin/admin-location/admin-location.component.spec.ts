import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationComponent } from './admin-location.component';

describe('AdminLocationComponent', () => {
  let component: AdminLocationComponent;
  let fixture: ComponentFixture<AdminLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
