import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { Ownership } from '../entities/ownership.entity';
import { CreateOwnershipDto } from '../dto/create-ownership.dto';

@Injectable({
  providedIn: 'root',
})
export class OwnershipService extends BaseEntityService<Ownership, CreateOwnershipDto, any> {
  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, 'ownerships');
  }
}

