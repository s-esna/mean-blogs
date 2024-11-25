import { Injectable } from '@angular/core';
import { IBlog } from '../model/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HoldBlogService {

  private blog: IBlog | null = null

  setBlog(blog: IBlog) {
    this.blog = blog
  }

  getBlog() : IBlog | null {
    const temp = this.blog
    this.blog = null
    return temp
  }
}
