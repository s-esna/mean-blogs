import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:5200'
  users$ = signal<IUser[]>([])
  
  http = inject(HttpClient)

  //CREATE
  postUserByFormValue(obj: IUser) {
    return this.http.post("", obj)
  }

  // READ 
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>("")
  }

  //UPDATE -Dont know how to implement
  editUserById(){

  }

  //DELETE
  deleteUserById(id : number) {
    this.http.delete("" + id)
  }


}
