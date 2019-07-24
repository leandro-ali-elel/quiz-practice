import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { forbiddenNameValidator, samePasswordValidator } from './shared/directives/forbidden-names.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  coffee = new FormControl('');
  coffeeSubscription: Subscription;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  userLoginForm = this.fb.group({
    password: [''],
    newPassword: [''],
    repeatedNewPassword: ['']
  }, { validators: [samePasswordValidator] });

  builderProfileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('', [forbiddenNameValidator([/bob/, /mike/])])
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.coffeeSubscription = this.coffee.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(event => {
      console.log(event);
    });
  }

  onSubmit() {
    console.log('submit!', this.profileForm.value);
  }
  onSubmitBuilder() {
    console.log('submit builder!', this.builderProfileForm.value);
  }

  get aliases() {
    return this.builderProfileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(
      this.fb.control('a', [forbiddenNameValidator([/bob/, /mike/])]
      )
    );
  }

  ngOnDestroy() {
    this.coffeeSubscription.unsubscribe();
  }
}