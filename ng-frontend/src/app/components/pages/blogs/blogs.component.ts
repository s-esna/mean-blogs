import { Component, inject, OnInit } from '@angular/core';
import { IBlog } from '../../../model/interface/interfaces';
import { BlogsService } from '../../../service/blogs.service'; 
import { DisplayBlogsComponent } from "../../shared/display-blogs/display-blogs.component";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [ DisplayBlogsComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {

  blogService = inject(BlogsService)
  currentPage = 1
  totalPages = 1;
  //These are passed to child (DisplayBlogsComponent)
  pageTitle: string = 'All Blogs'
  blogs: IBlog[] = []
  loadPage(page: number = 1) {
        this.blogService.getAllBlogs(page)
        .subscribe(({blogs, totalPages}) => {
          this.blogs = blogs
          this.currentPage = page
          this.totalPages = totalPages
        })
  }
}