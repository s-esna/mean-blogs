import { Component, inject, OnInit, signal } from '@angular/core';
import { IBlog } from '../../model/interface/interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BlogsService } from '../../service/blogs.service';
import { catchError } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {

  blogService = inject(BlogsService)

  
  blogs$ = signal<IBlog[]>([])

  blog$ = signal<IBlog>({} as IBlog)
  
   

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage() {
    console.log("got blogs")
    this.blogService.getAllBlogs()
    // .pipe(
    //   catchError((err) => {
    //     console.log(err)
    //     throw err
    //   })
    // )
    .subscribe((blogs: IBlog[]) => {
      console.log(blogs)
      this.blogs$.set(blogs)
    })
    
  }



  deleteById(id: string) {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?")
    
    if (isConfirmed) {
      this.blogService.deleteBlogById(id).subscribe({
        next: () => {
          this.loadPage(); 
        },
        error: (err) => {
          console.error('Deletion failed', err);
          alert('Error deleting the blog. Please try again.');
        }
      })  
    }

    
  }

}
