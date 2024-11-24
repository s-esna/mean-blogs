import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogsService } from '../../service/blogs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})

export class AddBlogComponent implements OnInit {

  blogService = inject(BlogsService)
  router = inject(Router)

  ngOnInit(): void {
    const savedData = localStorage.getItem('addBlogForm')
    if (savedData) {
      this.addBlogForm.setValue(JSON.parse(savedData))
    }
    this.addBlogForm.valueChanges.subscribe((data) => {
      localStorage.setItem('addBlogForm', JSON.stringify(data))
    })
  }

  addBlogForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required),
    img: new FormControl(""),
    tags: new FormControl("")
  })



  onSubmit() {
    // debugger;
    const formData = this.addBlogForm.value
    console.log("these are the tags: " + formData.tags)
    
    
    if (formData.tags ) {
      formData.tags = formData.tags.split(',').map((tag : string) => tag.trim())
    } else {
      formData.tags = []
    }

    localStorage.removeItem('addBlogForm')
    console.log('Trying to add this Blog: ', formData)
    
    this.blogService.createBlog(formData).subscribe({
      next: (response) => {
          console.log('Blog added successfully:', response);
          this.router.navigateByUrl('/blogs'); // Redirect after success
      },
      error: (error) => {
          console.error('Failed to add blog:', error);
          // alert('An error occurred while adding the blog. Please try again.');
      }
  });
  }
}
