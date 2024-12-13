import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogsService } from '../../../service/blogs.service';
import { HoldBlogService } from '../../../service/hold-blog.service';
import { IBlog } from '../../../model/interface/interfaces';
import { jwtDecode } from 'jwt-decode';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-display-blogs',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './display-blogs.component.html',
  styleUrl: './display-blogs.component.css'
})
export class DisplayBlogsComponent implements OnInit {
    @Input() title: string = ''
    @Input() blogs :IBlog[]= []
    @Input() loadPage: Function = () => {};  // Function to load blogs
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;

    //FROM BOTH PARENTS
    toastr = inject(ToastrService)
    router = inject(Router)
    blogService = inject(BlogsService)
    holdBlogService = inject(HoldBlogService)

    //FROM TAGGED ONLY
    route = inject(ActivatedRoute) 

    //FROM BOTH PARENTS
    isAdmin = this.checkAdminStatus()
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

    //FROM BOTH PARENTS
    ngOnInit(): void {
      this.loadPage()
    }
    //FROM BOTH PARENTS
    updateById(blog: IBlog) {
      this.holdBlogService.setBlog(blog)
      this.router.navigateByUrl('/blogs/add-blog')
    }

    //FROM BOTH PARENTS
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
