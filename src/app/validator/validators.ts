import { FormControl, FormGroup } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

// 校验方法
export function mobileValidator(val: FormControl): any {
    const regExp = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const valid = regExp.test(val.value);
    console.log(`mobile 校验结果是: ${valid}`);
    return valid ? null : {mobile: 'invalid'};
}
export function mobileAsyncValidator(val: FormControl): any {
    const regExp = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const valid = regExp.test(val.value);
    console.log(`mobile 校验结果是: ${valid}`);
    return Observable.of(valid ? null : {mobile: 'invalid'}).delay(10000);
}
export function equalValidator(pwdGroup: FormGroup): any {
    const pwd = pwdGroup.get('password') as FormControl;
    const pwdConfirm = pwdGroup.get('pconfirm') as FormControl;
    const valid = (pwd.value === pwdConfirm.value);
    console.log(`密码相等校验: ${valid}`);
    return valid ? null : {equal: {description: '两次输入密码不一致'}};
}
