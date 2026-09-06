import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NewsletterService} from './newsletter.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isInternetExplorer} from '../../browser-utils';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JumboComponent {

  @Input() screenWidth: number;

  newsLetterFormVisible = false;

  newsletterForm: FormGroup;
  email: AbstractControl;

  constructor(private newsletterService: NewsletterService,
              private formBuilder: FormBuilder) {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.email = this.newsletterForm.get('email');
  }

  showNewsletterForm() {
    this.newsLetterFormVisible = true;
  }

  subscribeToNewsletter() {
    this.newsletterService.subscribe(this.email.value);
  }

  onSubmit() {
    this.subscribeToNewsletter();
  }

  isInternetExplorer() {
    return isInternetExplorer();
  }

}
