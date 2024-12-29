import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';
import { IBlog } from '../../../model/interface/interfaces';
import { HoldBlogService } from '../../../service/hold-blog.service';
import { ToastrService } from 'ngx-toastr';
import {QuillEditorComponent} from 'ngx-quill'
import Block from 'quill/blots/block';

// Block.tagName = "DIV";
// Quill.register(Block, true)

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, QuillEditorComponent],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})

export class AddBlogComponent implements OnInit {

  toastr = inject(ToastrService)
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
    const processTags = (tags: string) : string[] => {
      if (!tags) return [];
      return tags
              .split(',')
              .map(tag =>  tag.trim().replace(/\s+/g, '-'))
    }
    if (this.isEditMode$() && this.currentBlogId) {
      //Updating here
      
      if (!Array.isArray(formData.tags))  {
        if (formData.tags) {
          formData.tags = processTags(formData.tags)
        } else {
          formData.tags = []
        }
      }

      this.blogService.editBlogById(this.currentBlogId, formData).subscribe({
        next: () => {
          localStorage.removeItem('addBlogForm')
          this.router.navigateByUrl('blogs')
        }, error: err => {
          console.error('error updating blog', err)
        }
      })
      
    } else {
      //Add new blog

      //Tags are always string, converts into array. Mapping trims the spaces around each tag, and replaces the spaces within the tag with dashes '-'
      //Check for tags, if they are an empty string, make them into an empty array so they can pass validation on db
      if (formData.tags) {
        formData.tags = processTags(formData.tags)
      } else {
        formData.tags = []
      }

      localStorage.removeItem('addBlogForm')
      
      this.blogService.createBlog(formData).subscribe({
        next: (response) => {
            this.router.navigateByUrl('/blogs'); // Redirect after success
            this.toastr.success('Blog submitted successfully', "Blog added!" ,{
              timeOut: 5000, 
              positionClass: 'toast-top-right', 
              closeButton: true 
            })
        },
        error: (error) => {
            console.error('Failed to add blog:', error);
        }
    });
    }
    


   
  }
}
