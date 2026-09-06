import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactFormService} from '../../landing/contact/contact-form.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})

export class SubscribeComponent implements OnInit {

  liveDemoForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;

  constructor(private formService: ContactFormService,
              private formBuilder: FormBuilder) {
    this.liveDemoForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.email]],
      message: ['Needs a live Demo'],
    });

    this.name = this.liveDemoForm.get('name');
    this.email = this.liveDemoForm.get('email');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.formService.sendContactForm(this.liveDemoForm.getRawValue());
  }
}
