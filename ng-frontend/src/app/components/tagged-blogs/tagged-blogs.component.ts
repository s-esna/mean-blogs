import { Component, inject, OnInit } from '@angular/core';
import { HoldBlogService } from '../../service/hold-blog.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogsService } from '../../service/blogs.service';
import { IBlog } from '../../model/interface/interfaces';
import { jwtDecode } from 'jwt-decode';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-tagged-blogs',
  standalone: true,
  imports: [RouterLink, NotFoundComponent],
  templateUrl: './tagged-blogs.component.html',
  styleUrl: './tagged-blogs.component.css'
})
export class TaggedBlogsComponent implements OnInit {
  blogService = inject(BlogsService)
  route = inject(ActivatedRoute)
  holdBlogService = inject(HoldBlogService)
  router = inject(Router)

  blogs: IBlog[] = []

  isAdmin = this.checkAdminStatus()


  ngOnInit(): void {
    
    this.loadPage();

  }

  loadPage() {
    const tag = this.route.snapshot.paramMap.get('tag')

    if(tag){
      this.blogService.getTaggedBlogs(tag).subscribe((taggedBlogs: IBlog[]) => {
        this.blogs = taggedBlogs
        console.log('these are the blogs',taggedBlogs)
      })
    }
  }

  checkAdminStatus() {
    const token = localStorage.getItem("token")
    
    if (token) {
      try{
        const decodedToken: any = jwtDecode(token); 
        return decodedToken.isAdmin
      } catch (error) {
        console.error('could not decode token', error)
        return false
      }
      
    }
    return false
  }

  updateById(blog: IBlog) {
    this.holdBlogService.setBlog(blog)
    this.router.navigateByUrl('/blogs/add-blog')
    console.log("this is being passed: " , blog)
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
