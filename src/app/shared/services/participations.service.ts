import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { Participation } from '../entities/participation.entity';
import { CreateParticipationDto } from '../dto/create-participation.dto';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService extends BaseEntityService<Participation, CreateParticipationDto, any> {
  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, 'participations');
  }
}

