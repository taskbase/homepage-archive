import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactFormService {
  constructor(private http: HttpClient) {}

  sendContactForm(formContent: ContactFormContent): Observable<unknown> {
    const apiUrl =
      "https://europe-west1-aerial-rush-113616.cloudfunctions.net/sendMail";
    const receiver = "info@taskbase.com";
    const reqBody = {
      personalizations: [
        {
          to: [
            {
              email: receiver,
            },
          ],
        },
      ],
      from: {
        email: "contact@taskbase.com",
        name: formContent.name,
      },
      subject: "Anfrage zu Taskbase",
      content: [
        {
          type: "text/html",
          value: `<pre>Name:<br>${formContent.name}<br><br>Email:<br> ${formContent.email}<br><br>Message:<br> ${formContent.message}</pre>`,
        },
      ],
    };
    return this.http.post(apiUrl, reqBody);
  }
}

export interface ContactFormContent {
  name: string;
  email: string;
  message: string;
}
