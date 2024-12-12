import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  toastr = inject(ToastrService)

  years: number[] = []; 
  days: number[] = [];

  userService = inject(UserService)
  router = inject(Router)


  
  selectedDay : number = 0
  selectedMonth : number = 0
  selectedYear : number = 0
  
  // How the register component should behave when first initialised
  ngOnInit(): void {
    this.fillYears()
    this.fillDays()   

    //In case of mistaken refresh, all data except passwords stays put. Empties on submit
    const savedData = localStorage.getItem('registerUserForm');
    if (savedData) {
      this.registerUserForm.setValue(JSON.parse(savedData));
    }
    this.registerUserForm.valueChanges.subscribe((data) => {
      localStorage.setItem('registerUserForm', JSON.stringify(data));
    });
  }

  /**
   * How the form of a user-register should be. ReactiveForms & FormGroup are used since:
   * 1. We see the structure of the form
   * 2. We can initialise it
   * 3. We can add Validators

   */
  registerUserForm: FormGroup = new FormGroup({
   
    username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern(/^[^@]*$/) ]),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,}[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    // password must be at least 8 chars, including 1 uppercase, 1 lowercase, 1 symbol, 1 digit
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
    verifyPassword: new FormControl(""),
    birthDay: new FormControl(new Date().getDate()),
    birthMonth: new FormControl(new Date().getMonth() + 1),
    birthYear: new FormControl(new Date().getFullYear()),
    
  })



  fillYears() {
    for (let i  = 1905; i <= 2024; i++) {
      this.years.push(i)
    }
  }

  fillDays() {
    for (let i  = 1; i <= 31; i++) {
      this.days.push(i)
    }
  }

  passwordsDoNotMatch(pass1 : string, pass2: string) {
    return pass1 !== pass2;
  }

  onSubmit() {
    const formData = this.registerUserForm.value
    //FOUND OUT THE HARD WAY THAT OPTION ELEMENTS IN SELECT ARE ALWAYS STRINGS
    //Convert string to number
    console.log(typeof formData.birthDay)
    formData.birthDay = Number(formData.birthDay);
    formData.birthMonth = Number(formData.birthMonth);
    formData.birthYear = Number(formData.birthYear);

    const {verifyPassword, ...formDataNoVerify} = formData

    

    localStorage.removeItem('registerUserForm');
    console.log('Trying to register user:', formDataNoVerify);

    this.userService.postUserByFormValue(formDataNoVerify).subscribe({
      next: (response) => {
          console.log('User added successfully:', response);
          
          this.toastr.success("Welcome to the Team!", "You Registered Successfully" ,{
            timeOut: 5000, // Close after 3 seconds
            positionClass: 'toast-top-right', // Position on the screen
            closeButton: true // Show a close button
          })
          this.router.navigateByUrl('/users/login'); // Redirect after success
      },
      error: (error) => {
        console.error("Registration failed:", error);
        if (error.error.message === "Username exists") {
            this.toastr.warning("The username you entered is already taken. Please try a different one.", "Username taken" ,{
              timeOut: 5000, // Close after 3 seconds
              positionClass: 'toast-top-right', // Position on the screen
              closeButton: true // Show a close button
            })
        } else if (error.error.message === "Email exists") {
            this.toastr.warning("The email you entered is already registered. Please try a different one.", "Email Taken" ,{
              timeOut: 5000, // Close after 3 seconds
              positionClass: 'toast-top-right', // Position on the screen
              closeButton: true // Show a close button
            })
        } else {
            this.toastr.error("Registration failed. Please try again.", "OOPS" ,{
              timeOut: 5000, // Close after 3 seconds
              positionClass: 'toast-top-right', // Position on the screen
              closeButton: true // Show a close button
            })
        }
      }
    })
  }
}
