import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { IBlog } from '../../../model/interface/interfaces';
import { BlogsService } from '../../../service/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [NotFoundComponent, DatePipe, ReactiveFormsModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {

  sanitizer = inject(DomSanitizer);
  toastr = inject(ToastrService)
  blogService = inject(BlogsService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  cdr = inject(ChangeDetectorRef)
  
  blog = {} as IBlog 
  blogs : IBlog[] = [];
  loading: boolean = true; // Add a loading state to prevent flicker
  sanitizedBody: SafeHtml | null = null; 


  loadBlog(id : string | null) { 
    this.blogService.getSingleBlog(id)
    .subscribe((blog: IBlog) => {
        this.blog = blog
        this.sanitizedBody = this.sanitizer.bypassSecurityTrustHtml(this.blog.body)
        this.loading = false
      },
      (error) => {
        console.error('Error fetching blog', error);
        this.loading = false;
      }
    )
  }

  //user id extraction
  getUserIdFromToken() {
    const token = localStorage.getItem("token")
    
    if (token) {
      try{
        const decodedToken: any = jwtDecode(token); 
        
        return decodedToken.id
      } catch (error) {
        console.error('could not decode token', error)
        return 'no ID'
      } 
    }
  }

  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id')
    this.loadBlog(id)
  }

  //Comment logic
  addCommentForm: FormGroup = new FormGroup({
    userId: new FormControl(this.getUserIdFromToken()),
    commentBody: new FormControl("", Validators.required)
  })

  isUser() {
    return localStorage.getItem('token');  
  }

  onSubmit() {
    // event.preventDefault(); // Prevent the default form submission behavior
    const formData = this.addCommentForm.value
    const blogId = this.blog._id
    
    if (blogId) {
      if (formData.commentBody) {
        this.blogService.addComment(blogId, formData).subscribe((commentedBlog : IBlog) => {
          this.blog = commentedBlog
        })
      }
    }
    this.toastr.success(`${formData.commentBody}`, "Comment submitted successfully:")
  }

  onTagClick(tag : string) {
    this.router.navigateByUrl(`/blogs/tagged/${tag}`)
  }

}
