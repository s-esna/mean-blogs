import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = 'http://localhost:5200'
    
  
  http = inject(HttpClient)  

  private getAuthorizationHeaders() {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
  }

  sendEmail(msg: string)  {
      return this.http.post(`${this.url}/contact/message`, {message: msg}, { headers: this.getAuthorizationHeaders() })
  }
}
