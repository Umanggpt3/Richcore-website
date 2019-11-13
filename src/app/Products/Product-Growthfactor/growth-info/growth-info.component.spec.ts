import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthInfoComponent } from './growth-info.component';

describe('GrowthInfoComponent', () => {
  let component: GrowthInfoComponent;
  let fixture: ComponentFixture<GrowthInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
