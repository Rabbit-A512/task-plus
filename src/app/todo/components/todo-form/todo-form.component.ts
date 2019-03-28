import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      createdAt: [(new Date()).toISOString()],
      planToFinishAt: [''],
    });
  }

  handleSubmit() {
    // FIXME: remove log
    console.log(this.todoForm.value);
  }

  get titleControl() {
    return this.todoForm.get('title');
  }

  get descriptionControl() {
    return this.todoForm.get('description');
  }

}
