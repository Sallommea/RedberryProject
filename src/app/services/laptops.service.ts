import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, FormAllInfo } from '../models/form.model';
import { Observable, map } from 'rxjs';
import { Response } from '../models/form.model';
import { LaptopData } from '../models/laptop.model';
@Injectable({
  providedIn: 'root',
})
export class LaptopsService {
  baseUrl = 'https://pcfy.redberryinternship.ge/api/';
  token = '4b96756c57dd7a9d6aa75f70aa312e31';

  constructor(private http: HttpClient) {}

  addLaptop(info: FormAllInfo) {
    return this.http.post<FormAllInfo>(`${this.baseUrl}laptop/create`, info);
  }

  getAllLaptops(): Observable<Data[]> {
    return this.http
      .get<Response>(
        `${this.baseUrl}laptops?token=4b96756c57dd7a9d6aa75f70aa312e31`
      )
      .pipe(map((x) => x.data));
  }

  getLaptopById(id: number): Observable<LaptopData> {
    return this.http.get<LaptopData>(
      `${this.baseUrl}laptop/${id}?token=${this.token}`
    );
  }
}
