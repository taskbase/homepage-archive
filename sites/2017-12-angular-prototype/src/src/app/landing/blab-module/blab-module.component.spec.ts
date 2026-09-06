import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlabModuleComponent } from './blab-module.component';

describe('BlabModuleComponent', () => {
  let component: BlabModuleComponent;
  let fixture: ComponentFixture<BlabModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlabModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlabModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
