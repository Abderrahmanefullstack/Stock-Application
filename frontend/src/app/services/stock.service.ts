import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from '../models/movement';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private apiUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    addStockEntry(movement: Movement): Observable<Movement> {
        return this.http.post<Movement>(`${this.apiUrl}/stock/entree`, movement);
    }

    addStockExit(movement: Movement): Observable<Movement> {
        return this.http.post<Movement>(`${this.apiUrl}/stock/sortie`, movement);
    }

    getStockAlerts(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/stock/alert`);
    }

    getMovements(): Observable<Movement[]> {
        return this.http.get<Movement[]>(`${this.apiUrl}/mouvements`);
    }
}