import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarfModuleComponent } from './barf-module.component';

describe('BarfModuleComponent', () => {
  let component: BarfModuleComponent;
  let fixture: ComponentFixture<BarfModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarfModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarfModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
