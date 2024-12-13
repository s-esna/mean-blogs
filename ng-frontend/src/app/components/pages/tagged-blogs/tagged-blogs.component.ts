import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';
import { IBlog } from '../../../model/interface/interfaces';
import { NotFoundComponent } from "../not-found/not-found.component";
import { DisplayBlogsComponent } from "../../shared/display-blogs/display-blogs.component";

@Component({
  selector: 'app-tagged-blogs',
  standalone: true,
  imports: [ NotFoundComponent, DisplayBlogsComponent],
  templateUrl: './tagged-blogs.component.html',
  styleUrl: './tagged-blogs.component.css'
})
export class TaggedBlogsComponent {

  route = inject(ActivatedRoute)
  blogService = inject(BlogsService)
  currentPage = 1
  totalPages = 1;
  //Passed to child
   

  pageTitle: string = 'Blogs with tag: ' + this.route.snapshot.paramMap.get('tag')
  blogs: IBlog[] = []
  loadPage(page: number = 1) {
    const tag = this.route.snapshot.paramMap.get('tag')

    if(tag){
      this.blogService.getTaggedBlogs(tag, page)
        .subscribe(({blogs, totalPages}) => {
        this.blogs = blogs
        this.currentPage = page
        this.totalPages = totalPages
      })
    }
  }
}