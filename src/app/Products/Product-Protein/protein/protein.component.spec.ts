import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinComponent } from './protein.component';

describe('ProteinComponent', () => {
  let component: ProteinComponent;
  let fixture: ComponentFixture<ProteinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
