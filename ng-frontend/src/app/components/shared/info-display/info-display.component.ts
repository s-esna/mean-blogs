import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  @Input() song : string = '' 

  @Output() formSubmitted = new EventEmitter<string>();

  sanitizer = inject(DomSanitizer)
  userMessage: string = ''

  onSubmit() {
    this.formSubmitted.emit(this.userMessage);  
    this.userMessage = '';  
  }
  
  getSanitizedsong() {
    return this.sanitizer.bypassSecurityTrustHtml(this.song);
  }
}
