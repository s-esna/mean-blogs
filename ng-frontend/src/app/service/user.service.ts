import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:5200'
  
  http = inject(HttpClient)

  private getAuthorizationHeaders() {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
  }

  //CREATE - REGISTER USER
  postUserByFormValue(obj: IUser) {
    return this.http.post<IUser>(`${this.url}/users/register`, obj)
  }

  // READ ALL
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/users/`, { headers: this.getAuthorizationHeaders() })
  }

  //CREATE - LOGIN USER
  loginUser(obj: {emailOrUsername: string, password:string}) {
    return this.http.post<{emailOrUsername: string, password:string}>(`${this.url}/users/login`, obj)
  }

  //UPDATE -Dont know if I implement
  // editUserById(){

  // }

  //DELETE dont know if i implement
  // deleteUserById(id : number) {
  //   this.http.delete("" + id)
  // }


}
