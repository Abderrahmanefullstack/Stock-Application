import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5000/api/auth';
    private currentUserSubject = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {
        const token = localStorage.getItem('token');
        if (token) {
            this.currentUserSubject.next({ token });
        }
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
            tap((res: any) => {
                localStorage.setItem('token', res.token);
                this.currentUserSubject.next({ token: res.token });
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}