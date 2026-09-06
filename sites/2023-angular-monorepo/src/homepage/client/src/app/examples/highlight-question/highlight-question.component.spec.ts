import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HighlightModule, SimpleHighlightableToken } from "@taskbase/highlight";
import { Component, DebugElement } from "@angular/core";
import { AiService } from "../ai.service";
import { of } from "rxjs";
import { HighlightQuestionComponent } from "./highlight-question.component";
import { By } from "@angular/platform-browser";
import { findFirstElementContainingText } from "@taskbase/testing";
import { GradedHighlightableToken } from "@taskbase/highlight";

const MOCKED_AI_SERVICE_RESPONSE = [
  {
    tokens: ["The", "blond", "girl", "played", "very", "good", "football", "."],
    posSimple: [
      "ELSE",
      "ADJECTIVE",
      "NOUN",
      "VERB",
      "ADVERB",
      "ADJECTIVE",
      "NOUN",
      "ELSE",
    ],
  },
];

@Component({
  template: ` <app-highlight-question
    oldStudentInput="The blond girl played very good football."
    studentInput="studentInput"
  >
  </app-highlight-question>`,
})
class TestHostComponent {}

let fixture: ComponentFixture<TestHostComponent>;
let testHost: TestHostComponent;
let debugElt: DebugElement;
let component: HighlightQuestionComponent;

const getFootballToken = (): SimpleHighlightableToken => {
  return component.tokens.filter((token) => token.token === `football`)[0];
};

describe(HighlightQuestionComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HighlightModule],
      declarations: [TestHostComponent, HighlightQuestionComponent],
      providers: [
        {
          provide: AiService,
          useValue: {
            partOfSpeechEnglishTokenizer: () => {
              return of(MOCKED_AI_SERVICE_RESPONSE);
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    debugElt = fixture.debugElement.query(
      By.directive(HighlightQuestionComponent)
    );
    component = debugElt.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(testHost).toBeTruthy();
  });

  it("should be able to update tokens", () => {
    const updatedTokes: SimpleHighlightableToken[] = [
      {
        backgroundColor: `FF0000`,
        token: `HelloWorld`,
        isBold: false,
      },
    ];
    component.onTokensChanged(updatedTokes);
    fixture.detectChanges();
    expect(
      findFirstElementContainingText(
        `HelloWorld`,
        fixture.nativeElement as HTMLElement
      )
    ).not.toBeNull();
  });

  it("should be able to highlight token", () => {
    const footballElement = findFirstElementContainingText(
      `football`,
      fixture.nativeElement
    ) as HTMLElement;

    footballElement.click();
    const footballToken = getFootballToken();
    fixture.detectChanges();
    expect(footballToken.backgroundColor).toEqual(component.highlightColor);
  });
});
