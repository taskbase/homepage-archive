import { Component, OnInit } from '@angular/core';
import {ContactFormService} from './contact-form.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  message: AbstractControl;

  constructor(
    private contactFormService: ContactFormService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    });
    this.name = this.contactForm.get('name');
    this.email = this.contactForm.get('email');
    this.message = this.contactForm.get('message');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.contactFormService.sendContactForm(this.contactForm.getRawValue());
  }

}
