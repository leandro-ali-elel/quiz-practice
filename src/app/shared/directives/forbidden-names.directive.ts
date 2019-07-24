import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors, FormControl, FormArray } from '@angular/forms';

@Directive({
  selector: '[appForbiddenNames]'
})
export class ForbiddenNamesDirective {

}

export function forbiddenNameValidator(nameRe: RegExp[]): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = nameRe.some(name => name.test(control.value));

    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

export const samePasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const newPassword = control.get('newPassword').value;
  const repeatedNewPassword = control.get('repeatedNewPassword').value;
  return newPassword !== repeatedNewPassword ? { differentPasswords: true } : null;
};
