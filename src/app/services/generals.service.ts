import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Brands,
  CPUs,
  Position,
  Response,
  ResponseBrands,
  ResponseCPUs,
  ResponsePos,
  User,
} from '../models/team.model';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GeneralsService {
  baseUrl = 'https://pcfy.redberryinternship.ge/api/';
  token = '4b96756c57dd7a9d6aa75f70aa312e31';

  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<User[]> {
    return this.http
      .get<Response>(`${this.baseUrl}teams`)
      .pipe(map((x) => x.data));
  }

  getAllPositions(): Observable<Position[]> {
    return this.http
      .get<ResponsePos>(`${this.baseUrl}positions`)
      .pipe(map((x) => x.data));
  }

  getAllBrands(): Observable<Brands[]> {
    return this.http
      .get<ResponseBrands>(`${this.baseUrl}brands`)
      .pipe(map((x) => x.data));
  }

  getAllCPUs(): Observable<CPUs[]> {
    return this.http
      .get<ResponseCPUs>(`${this.baseUrl}cpus`)
      .pipe(map((x) => x.data));
  }
  formsubmitted = new EventEmitter<boolean>();
  employeeinfosubmitted = new EventEmitter();
  goback = new EventEmitter();
  goToMain = new EventEmitter();
}
