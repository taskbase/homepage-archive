import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from 'ngx-toastytoast';

@Injectable()
export class NewsletterService {

  backendHost = 'https://taskbase-homepage-backend.herokuapp.com';
  private backendApi = `${this.backendHost}/subscribe`;
  private listId = '84283b9519';

  subscribe(email: string) {
    const params = {listid: this.listId};
    const options = {params: params};
    const req = this.http.post(`${this.backendApi}`, {EMAIL: email}, options);
    const notificationPosition = {
      bottom: 0,
      left: 0,
      right: 0
    };
    req.subscribe(resp => {
      this.notify.success('Danke für die Anmeldung!', {position: notificationPosition});
    }, errorResp => {

      const isMailchimpError = errorResp && errorResp.error && errorResp.error.body && errorResp.error.body.title;
      const translateMailchimpError = (mailchimpErrorTitle) => {
        if (mailchimpErrorTitle === 'Member Exists') {
          return 'Diese Email ist schon für den Newsletter angemeldet!';
        } else {
          return 'Oops, da ist was schief gelaufen.';
        }
      };
      const errorMessage = isMailchimpError ? translateMailchimpError(errorResp.error.body.title) : 'Unbekannter Fehler';
      this.notify.error(errorMessage, {position: notificationPosition});
    });
  }

  constructor(
    private http: HttpClient,
    private notify: NotifyService
  ) {}

}
