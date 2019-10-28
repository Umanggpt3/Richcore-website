import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthfactorComponent } from './growthfactor.component';

describe('GrowthfactorComponent', () => {
  let component: GrowthfactorComponent;
  let fixture: ComponentFixture<GrowthfactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthfactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthfactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
