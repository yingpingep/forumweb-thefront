import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { FormBuilder, Validators, FormControl } from '@angular/forms'

@Component({
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.scss'],
})
export class NicknameComponent implements OnInit {
  nickName = new FormControl('', Validators.required)
  nickForm = this.fb.group({
    nickName: this.nickName,
  })
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(
      `🌻: NicknameComponent -> onSubmit -> this.nickForm.value`,
      this.nickForm.get('nickName')
    )
  }
}
