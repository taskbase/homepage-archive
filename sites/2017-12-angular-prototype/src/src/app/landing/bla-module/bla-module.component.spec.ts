import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlaModuleComponent } from './bla-module.component';

describe('BlaModuleComponent', () => {
  let component: BlaModuleComponent;
  let fixture: ComponentFixture<BlaModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlaModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlaModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
