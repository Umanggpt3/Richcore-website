import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrothFacotorDisplayComponent } from './groth-facotor-display.component';

describe('GrothFacotorDisplayComponent', () => {
  let component: GrothFacotorDisplayComponent;
  let fixture: ComponentFixture<GrothFacotorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrothFacotorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrothFacotorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
