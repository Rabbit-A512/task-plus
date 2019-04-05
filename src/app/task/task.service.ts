import { HttpClient } from '@angular/common/http';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { BaseEntityService } from './../shared/base-entity.service';
import { Injectable } from '@angular/core';
import { Task } from './task.entity';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseEntityService<Task, CreateTaskDto, UpdateTaskDto> {
  constructor(
    protected readonly http: HttpClient,
  ) {
    super(http, 'tasks');
  }
}

