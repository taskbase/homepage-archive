import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatesService {
  sideNavOpen = new BehaviorSubject(false);
  scrollYPosition = new BehaviorSubject(0);
}
