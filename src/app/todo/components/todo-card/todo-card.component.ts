import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../todo.entity';
import { MatDialog } from '@angular/material';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Input() isParent: boolean;

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
  ) { }

  ngOnInit() {
  }

  get containerClasses() {
    return {
      [this.isParent ? 'parent' : 'child']: true,
      'card': true,
    };
  }

  openTodoForm(): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      height: '100%',
      position: {
        right: '0px'
      },
      data: { parentId: this.todo.id }
    });
  }

  deleteOne(): void {
    this.todoService.deleteOneById(this.todo.id).subscribe({
      next: res => {
        // FIXME: remove log
        console.log(res);
      },
    });
  }

}
