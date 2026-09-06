import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class StatesService {

  sideNavOpen = new BehaviorSubject(false);
  scrollYPosition = new BehaviorSubject(0);

}
