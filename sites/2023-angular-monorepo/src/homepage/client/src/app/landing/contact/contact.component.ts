import { Component, OnInit } from "@angular/core";
import { ContactFormService } from "./contact-form.service";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { NotifyService } from "@taskbase/toast";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  contactForm: UntypedFormGroup;
  name: AbstractControl | null;
  email: AbstractControl | null;
  message: AbstractControl | null;
  isLoading = false;

  constructor(
    private contactFormService: ContactFormService,
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotifyService
  ) {
    this.contactForm = this.formBuilder.group({
      name: [""],
      email: [""],
      message: [""],
    });
    this.name = this.contactForm.get("name");
    this.email = this.contactForm.get("email");
    this.message = this.contactForm.get("message");
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading = true;
    const notificationPosition = {
      bottom: 0,
      left: 0,
      right: 0,
    };

    this.contactFormService
      .sendContactForm(this.contactForm.getRawValue())
      .subscribe(
        () => {
          this.notifyService.success(
            "Danke für die Nachricht! Wir werden uns in Kürze bei Ihnen melden.",
            {
              position: notificationPosition,
              timer: 4000,
            }
          );
          this.isLoading = false;
        },
        (errorResp) => {
          const errorMessage = "Oops, da ist was schief gelaufen.";
          this.notifyService.error(errorMessage, {
            position: notificationPosition,
          });
          this.isLoading = false;
        }
      );
  }
}
