import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../todo.entity';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Input() isParent: boolean;

  constructor() { }

  ngOnInit() {
  }

  get containerClasses() {
    return {
      [this.isParent ? 'parent' : 'child']: true,
      'card': true,
    };
  }

}
