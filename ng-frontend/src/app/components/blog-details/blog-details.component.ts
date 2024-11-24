import { Component, inject, OnInit, signal } from '@angular/core';
import { IBlog } from '../../model/interface/interfaces';
import { BlogsService } from '../../service/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [NotFoundComponent, DatePipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  
  blogService = inject(BlogsService)
  route = inject(ActivatedRoute)
  



  blog$ = signal<IBlog>({} as IBlog)

  loadBlog(id : string | null) { 
    this.blogService.getSingleBlog(id)
    .subscribe((blog: IBlog) => 
        this.blog$.set(blog)
    )
  }

  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id')
      this.loadBlog(id)
  }

}
