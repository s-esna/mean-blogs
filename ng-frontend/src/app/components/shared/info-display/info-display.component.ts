import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-display',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info-display.component.html',
  styleUrl: './info-display.component.css'
})
export class InfoDisplayComponent {
  @Input() title: string = ''
  @Input() content: string = ''
  @Input() showInput: boolean = false

  @Output() formSubmitted = new EventEmitter<string>();

  userMessage: string = ''

  onSubmit() {
    this.formSubmitted.emit(this.userMessage);  // Emit the user message to the parent
    this.userMessage = '';  // Clear the input field
  }
  

}
