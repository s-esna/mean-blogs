import { Component, inject, OnInit } from '@angular/core';
import { IBlog } from '../../../model/interface/interfaces';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service'; 
import { SlicePipe } from '@angular/common';
import { HoldBlogService } from '../../../service/hold-blog.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  toastr = inject(ToastrService)
  router = inject(Router)
  blogService = inject(BlogsService)
  holdBlogService = inject(HoldBlogService)
  
  blogs :IBlog[]= []
  
  isAdmin = this.checkAdminStatus()
  
  currentPage = 1
  totalPagesArray: number[] = []
  totalPages = 1;

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage(page: number = 1) {
    this.blogService.getAllBlogs(page)
    .subscribe(({blogs, totalPages}) => {
      this.blogs = blogs
      this.currentPage = page
      this.totalPages = totalPages
    })
  }

  fetchResult(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase()
    
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
          this.toastr.error('Error deleting the blog. Please try again.', "Could not delete blog" ,{
            timeOut: 5000, 
            positionClass: 'toast-top-right', 
            closeButton: true 
          })
        }
      })  
    }
  }
}
