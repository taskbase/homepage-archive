import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingpointComponent } from './sellingpoint.component';

describe('SellingpointComponent', () => {
  let component: SellingpointComponent;
  let fixture: ComponentFixture<SellingpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
