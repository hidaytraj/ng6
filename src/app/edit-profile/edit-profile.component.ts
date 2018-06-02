import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editForm =  new FormGroup({
    name: new FormControl()
  })
  constructor(private fb:FormBuilder) { }

  createForm(){
    this.editForm = this.fb.group({
      name : ['', Validators.required],
      designation: '',
      phone: '',
      email: ''
    })
  }

  ngOnInit() {
  }

}
