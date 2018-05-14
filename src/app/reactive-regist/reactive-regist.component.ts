import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { mobileValidator, equalValidator, mobileAsyncValidator } from '../validator/validators';

@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.css']
})
export class ReactiveRegistComponent implements OnInit {

  formModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.formModel = fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', mobileValidator, mobileAsyncValidator],
      passwordsGroup: fb.group({
        password: ['', Validators.minLength(6)],
        pconfirm: ['']
      }, {validator: equalValidator})
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.formModel.status === 'PENDING') {
      console.log('正在验证字段, 请稍等');
      return false;
    }
    // 手机输入校验
    const isValid: boolean = this.formModel.get('username').valid;
    console.log(`username 的校验结果是: ${isValid}`);
    const err = this.formModel.get('username').errors;
    console.log(`username 的错误信息是: ${JSON.stringify(err)}`);

    // 密码校验
    const pwd = this.formModel.get('passwordsGroup').get('password') as FormControl;
    const pwdConfirm = this.formModel.get('passwordsGroup').get('pconfirm') as FormControl;
    const pwdValid: boolean = (pwd === pwdConfirm);
    console.log(`密码校验: ${isValid}`);
    const pwdErr = this.formModel.get('passwordsGroup').errors;
    console.log(`密码校验错误信息: ${JSON.stringify(pwdErr)}`);
    // 如果全表单没错误打印所有表单信息
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
    console.log('formModel: ', this.formModel);
  }

}
