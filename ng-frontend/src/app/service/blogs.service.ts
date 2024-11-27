import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IBlog } from '../model/interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private url = 'http://localhost:5200'
  

  http = inject(HttpClient)  


  // READ 
  getAllBlogs(): Observable<IBlog[]>  {
    return this.http.get<IBlog[]>(`${this.url}/blogs`)
              
  }
  //READ ONE
  getSingleBlog(id: string | null): Observable<IBlog>  {
    return this.http.get<IBlog>(`${this.url}/blogs/${id}`)
  }
  //CREATE
  createBlog(obj: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(`${this.url}/blogs/`, obj)
  }

  //UPDATE 
  editBlogById(id : string, obj: IBlog) : Observable<IBlog> {
    return this.http.patch<IBlog>(`${this.url}/blogs/${id}`, obj)        //patch instead .put because put might change the whole thing
  }

  //DELETE
  deleteBlogById(id : string) : Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/blogs/${id}`)
  }
}
