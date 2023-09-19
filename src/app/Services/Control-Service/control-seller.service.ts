import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlSellerService {

  private baseUrl = 'http://localhost:3300'; 

  constructor(private http: HttpClient) { }

  getAllSellers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/seller`);
  }

  deleteSeller(sellerId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/seller/${sellerId}`);
  }}
