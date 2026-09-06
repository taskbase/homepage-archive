import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { JumboComponent } from "./jumbo.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("Jumbo Component", () => {
  let component: JumboComponent;
  let fixture: ComponentFixture<JumboComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JumboComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumboComponent);
    component = fixture.componentInstance;
    // ATTENTION: the component is onPush => do you can run detectChanges only ONCE
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a title", () => {
    const jumboTitle = fixture.nativeElement.querySelector("#jumbo-title");

    expect(jumboTitle).toBeTruthy();
  });

  it("should have correct image on mobile", () => {
    component.screenWidth = 600;
    fixture.detectChanges();

    const jumboPic = fixture.nativeElement.querySelector("#jumbo-large-pic");
    const jumboSmallPic =
      fixture.nativeElement.querySelector("#jumbo-small-pic");

    expect(jumboPic).toBeFalsy();
    expect(jumboSmallPic).toBeTruthy();
  });

  it("should have correct image on desktop", () => {
    component.screenWidth = 1000;
    fixture.detectChanges();

    const jumboPic = fixture.nativeElement.querySelector("#jumbo-large-pic");
    const jumboSmallPic =
      fixture.nativeElement.querySelector("#jumbo-small-pic");

    expect(jumboPic).toBeTruthy();
    expect(jumboSmallPic).toBeFalsy();
  });
});
