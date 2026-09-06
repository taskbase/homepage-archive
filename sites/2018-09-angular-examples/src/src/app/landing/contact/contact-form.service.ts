import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from 'ngx-toastytoast';

@Injectable()
export class ContactFormService {

  sendContactForm(formContent) {
    const apiUrl = 'https://europe-west1-aerial-rush-113616.cloudfunctions.net/sendMail';
    const receiver = 'info@taskbase.com';
    const reqBody = {
      'personalizations': [
        {
          'to': [
            {
              'email': receiver
            }
          ]
        }
      ],
      'from': {
        'email': 'contact@taskbase.com',
        'name': formContent.name
      },
      'subject': 'Anfrage zu Taskbase',
      'content': [
        {
          'type': 'text/html',
          'value': `<pre>Name:<br>${formContent.name}<br><br>Email:<br> ${formContent.email}<br><br>Message:<br> ${formContent.message}</pre>`
        }
      ]
    };
    const req = this.http.post(apiUrl, reqBody);
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
  ) {
  }
}
