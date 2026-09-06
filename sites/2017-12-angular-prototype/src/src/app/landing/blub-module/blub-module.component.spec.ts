import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlubModuleComponent } from './blub-module.component';

describe('BlubModuleComponent', () => {
  let component: BlubModuleComponent;
  let fixture: ComponentFixture<BlubModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlubModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlubModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
