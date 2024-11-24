import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})

export class AddBlogComponent implements OnInit {

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
    date: new FormControl(new Date().getDate()),
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required),
    img: new FormControl(""),
    tags: new FormControl([])
  })



  onSubmit() {
    const formData = this.addBlogForm.value

    localStorage.removeItem('addBlogForm')
    console.log('Blog added: ', formData)
  }
}
