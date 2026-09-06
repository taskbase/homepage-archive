import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ContactFormService } from "../../landing/contact/contact-form.service";
import { NotifyService } from "@taskbase/toast";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.scss"],
})
export class SubscribeComponent implements OnInit {
  liveDemoForm: UntypedFormGroup;
  name: AbstractControl = new UntypedFormControl("");
  email: AbstractControl = new UntypedFormControl("", [Validators.email]);
  isLoading = false;

  constructor(
    private formService: ContactFormService,
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotifyService
  ) {
    this.liveDemoForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: ["Needs a live Demo"],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading = true;
    const notificationPosition = {
      bottom: 0,
      left: 0,
      right: 0,
    };

    this.formService.sendContactForm(this.liveDemoForm.getRawValue()).subscribe(
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
      (respError) => {
        const errorMessage = "Oops, da ist was schief gelaufen.";
        this.notifyService.error(errorMessage, {
          position: notificationPosition,
        });
        this.isLoading = false;
      }
    );
  }
}
