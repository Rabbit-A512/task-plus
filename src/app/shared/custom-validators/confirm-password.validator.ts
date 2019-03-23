import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notDuplicateValidator(field1: string, field2: string, errorName = 'notDuplicate'): ValidatorFn {
  return function(control: FormControl): ValidationErrors | null {
    const control1 = control.get(field1);
    const control2 = control.get(field2);
    return control1.value === control2.value ? null : { [errorName]: true };
  }
}
