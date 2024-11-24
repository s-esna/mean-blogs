import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  years: number[] = []; 
  days: number[] = [];

  password: string = ""
  verifiedPassword: string = ""
  
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
    userId: new FormControl(0),
    username: new FormControl("", [Validators.required, Validators.minLength(4) ]),
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


    localStorage.removeItem('registerUserForm');
    console.log('Form submitted:', formData);

    // this.userService.registerUser(formData).subscribe({
    //   next: (response) => {
    //     console.log('User registered successfully', response);
    //     // Optionally redirect user or display success message
    //   },
    //   error: (error) => {
    //     console.error('Registration failed', error);
    //     // Handle the error (e.g., show error message to the user)
    //   }
  }

  




}
