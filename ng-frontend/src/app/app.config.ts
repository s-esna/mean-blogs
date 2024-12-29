import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideQuillConfig } from 'ngx-quill/config';

export const appConfig: ApplicationConfig = {
  providers: [ provideQuillConfig({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],                     
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],   
        [{ 'indent': '-1' }, { 'indent': '+1' }],        
        [{ 'header': [1, 2, 3, false] }],                
        [{ 'color': [] }, { 'background': [] }],         
        [{ 'align': [] }],                             
        ['clean'],                                       
      ],
    },
    theme: 'snow', 
    placeholder: 'Write something amazing...', 
  }),provideHttpClient() ,provideToastr(),provideAnimations(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
