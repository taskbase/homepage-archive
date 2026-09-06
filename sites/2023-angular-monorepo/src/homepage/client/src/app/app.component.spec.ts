import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("App Component", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have navbar, footer, main content", () => {
    const notify = fixture.nativeElement.querySelector("notify");
    const router = fixture.nativeElement.querySelector("router-outlet");

    expect(notify).toBeTruthy();
    expect(router).toBeTruthy();
  });
});
