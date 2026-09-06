import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from 'notify-angular';

@Injectable()
export class ContactFormService {

  backendHost = 'https://taskbase-homepage-backend.herokuapp.com';
  private backendApi = `${this.backendHost}/contact`;

  sendContactForm(formContent) {
    const req = this.http.post(`${this.backendApi}`, formContent);
    const notificationPosition = {
      bottom: 0,
      left: 0,
      right: 0
    };
    req.subscribe(resp => {
      this.notify.success('Danke für die Nachricht! Wir werden uns in Kürze bei Ihnen melden.',
        {
          position: notificationPosition,
          timer: 4000
        });
    }, errorResp => {
      const errorMessage = 'Oops, da ist was schief gelaufen.';
      this.notify.error(errorMessage, {position: notificationPosition});
    });
  }

  constructor(
    private http: HttpClient,
    private notify: NotifyService
  ) {}

}
