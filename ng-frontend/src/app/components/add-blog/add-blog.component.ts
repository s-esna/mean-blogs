import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogsService } from '../../service/blogs.service';
import { DatePipe } from '@angular/common';
import { IBlog } from '../../model/interface/interfaces';
import { HoldBlogService } from '../../service/hold-blog.service';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})

export class AddBlogComponent implements OnInit {

  blogService = inject(BlogsService)
  holdBlogService = inject(HoldBlogService)
  router = inject(Router)

  //Below 2, are used for editting a blog that was passed by the edit button in blogs.component
  isEditMode$ : WritableSignal<boolean> = signal(false)
  currentBlogId : string | null = null
  currentBlogDate : Date | null = null

  ngOnInit(): void {

    const blog : IBlog | null = this.holdBlogService.getBlog()
    if (blog) {
      console.log("this was passed from the edit button " , blog)
      this.isEditMode$.set(true)
      this.currentBlogId = blog._id
      this.currentBlogDate = blog.date
      this.addBlogForm.setValue ({
        title: blog.title,
        body: blog.body,
        img: blog.img,
        tags: blog.tags,
      })
    }


    const savedData = localStorage.getItem('addBlogForm')
    if (savedData && !this.isEditMode$) {
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

    if (this.isEditMode$() && this.currentBlogId) {
      //Updating here
      
      if (!Array.isArray(formData.tags))  {
        if (formData.tags) {
          formData.tags = formData.tags.split(',').map((tag : string) => tag.trim())
        } else {
          formData.tags = []
        }
      }

      this.blogService.editBlogById(this.currentBlogId, formData).subscribe({
        next: () => {
          localStorage.removeItem('addBlogForm')
          console.log('blog updated successfully')
          this.router.navigateByUrl('blogs')
        }, error: err => {
          console.error('error updating blog', err)
        }
      })
      
    } else {
      //Add new blog

      //Tags are always string, converts into array.
       //Check for tags, if they are an empty string, make them into an empty array so they can pass validation on db
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
}
