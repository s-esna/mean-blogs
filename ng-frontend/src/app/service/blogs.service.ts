import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IBlog } from '../model/interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private url = 'http://localhost:5200'
  

  http = inject(HttpClient)  

  private getAuthorizationHeaders() {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
  }

  // GET ALL 
  getAllBlogs(page: number, query: string = '' ,limit: number = 3): Observable<{blogs :IBlog[]; totalPages: number}>  {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('query', query);

    const headers = this.getAuthorizationHeaders(); // Add authorization headers if needed

    return this.http.get<{ blogs: IBlog[], totalPages: number }>(`${this.url}/blogs`, { params, headers });
  }
  //GET ONE
  getSingleBlog(id: string | null): Observable<IBlog>  {
    return this.http.get<IBlog>(`${this.url}/blogs/${id}`, { headers: this.getAuthorizationHeaders() })
  }

  //GET TAGGED
  getTaggedBlogs(tag: string, page: number, limit: number = 3) : Observable<{blogs: IBlog[]; totalPages:number}> {
    return this.http.get<{blogs:IBlog[]; totalPages: number}>(`${this.url}/blogs/tagged/${tag}?page=${page}&limit=${limit}`, { headers: this.getAuthorizationHeaders() })
  }

  //CREATE
  createBlog(obj: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(`${this.url}/blogs/`, obj, { headers: this.getAuthorizationHeaders() })
  }

  //CREATE COMMENT
  addComment(blogId: string, obj : {userId: string, commentBody: string, date: Date}) : Observable<IBlog> {
    return this.http.post<IBlog>(`${this.url}/blogs/${blogId}/comments`, obj, { headers: this.getAuthorizationHeaders() })
  }

  //UPDATE 
  editBlogById(id : string, obj: IBlog) : Observable<IBlog> {
    return this.http.patch<IBlog>(`${this.url}/blogs/${id}`, obj, { headers: this.getAuthorizationHeaders() })        //patch instead .put because put might change the whole thing
  }

  //DELETE
  deleteBlogById(id : string) : Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/blogs/${id}`, { headers: this.getAuthorizationHeaders() })
  }
}
