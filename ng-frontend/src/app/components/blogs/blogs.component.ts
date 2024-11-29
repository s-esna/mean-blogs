import { Component, inject, OnInit } from '@angular/core';
import { IBlog } from '../../model/interface/interfaces';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BlogsService } from '../../service/blogs.service'; 
import { JsonPipe } from '@angular/common';
import { HoldBlogService } from '../../service/hold-blog.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {

  router = inject(Router)
  blogService = inject(BlogsService)
  holdBlogService = inject(HoldBlogService)
  
  blogs :IBlog[]= []
  filteredBlogs : IBlog[] = []
  filteredAndPaginatedBlogs: IBlog[] =[]
  
  isAdmin = this.checkAdminStatus()

  currentPage = 1
  blogsPerPage = 3
  totalPagesArray: number[] = []
  totalPages = 0;

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage() {
    this.blogService.getAllBlogs()
    .subscribe((blogs) => {
      //blogs initialization
      this.blogs = blogs 
      this.filteredBlogs = blogs
      // this.filteredAndPaginatedBlogs = blogs

      //pagination
      this.resetPagination()
      this.filteredAndPaginatedBlogs = this.paginateBlogs()
      console.log('number of blogs and total pages and pages array: ' ,this.filteredBlogs.length ,this.totalPages, this.totalPagesArray)
    })
  }

  fetchResult(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase()
    this.resetPagination()
    this.filteredBlogs = this.blogs.filter((blog) => {
      return ((blog.title.toLowerCase().includes(searchTerm) ||
      blog.body.toLowerCase().includes(searchTerm)))
    })
    
    this.filteredAndPaginatedBlogs = this.paginateBlogs()
    console.log(searchTerm)
    console.log(this.blogs, this.filteredBlogs, this.filteredAndPaginatedBlogs)
  }

  resetPagination() {
    this.currentPage = 1
    this.totalPages = Math.ceil((this.filteredBlogs.length)/this.blogsPerPage)
    this.totalPagesArray =[]
    for (let i = 0; i < this.totalPages; i++) {
      this.totalPagesArray.push(i)
    }
  }

  paginateBlogs() : IBlog[] {
    const start = (this.currentPage - 1) * this.blogsPerPage
    return this.filteredBlogs.slice(start, start + this.blogsPerPage)
  }

  changePage(page : number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.filteredAndPaginatedBlogs = this.paginateBlogs()
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
