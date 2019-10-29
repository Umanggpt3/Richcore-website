import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinMenuComponent } from './protein-menu.component';

describe('ProteinMenuComponent', () => {
  let component: ProteinMenuComponent;
  let fixture: ComponentFixture<ProteinMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
