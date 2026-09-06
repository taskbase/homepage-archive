import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NewsletterService} from './newsletter.service';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


const SHOW_IMAGE_ABOVE = 900;

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JumboComponent implements OnChanges {

  @Input() screenWidth: number;
  showImage: boolean;

  newsletterForm: FormGroup;
  email: AbstractControl;

  constructor(
    private newsletterService: NewsletterService,
    private formBuilder: FormBuilder
  ) {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.email = this.newsletterForm.get('email');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setShowImage(this.screenWidth);
  }

  setShowImage(windowSize: number) {
    this.showImage = windowSize > SHOW_IMAGE_ABOVE;
  }

  subscribeToNewsletter() {
    this.newsletterService.subscribe(this.email.value);
  }

  onSubmit() {
    this.subscribeToNewsletter();
  }

}
