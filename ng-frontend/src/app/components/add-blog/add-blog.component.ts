import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogsService } from '../../service/blogs.service';

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
    // date: new FormControl(new Date().getDate()),
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required),
    img: new FormControl(""),
    tags: new FormControl([])
  })



  onSubmit() {
    // debugger;
    const formData = this.addBlogForm.value

    // if (formData.tags) {
    //   formData.tags = formData.tags.split(',').map((tag: string )=> tag.trim())
    // }

    localStorage.removeItem('addBlogForm')
    console.log('Blog added: ', formData)
    
    this.blogService.createBlog(formData).subscribe({
      next: (response) => {
          console.log('Blog added successfully:', response);
          this.router.navigateByUrl('/blogs'); // Redirect after success
      },
      error: (error) => {
          console.error('Failed to add blog:', error);
          alert('An error occurred while adding the blog. Please try again.');
      }
  });
  }
}
