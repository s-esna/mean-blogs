import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { loginAuthGuard } from './service/login-auth.guard';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { adminPrivilegeGuard } from './service/admin-privilege.guard';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [loginAuthGuard]
    },
    {
        path: 'blogs',
        component: BlogsComponent,
        canActivate: [loginAuthGuard]
    }, 
    {
        path: 'blogs/add-blog',
        component: AddBlogComponent,
        canActivate: [loginAuthGuard, adminPrivilegeGuard]
    },
    {
        path: 'blogs/:_id',
        component: BlogDetailsComponent,
        canActivate: [loginAuthGuard]
    },
    {
        path: 'contact',
        component: ContactComponent,
        canActivate: [loginAuthGuard]
    },
    {
        path: 'faq',
        component: FaqComponent,
        canActivate: [loginAuthGuard]
    },
    {
        path:'users',
        component: UsersComponent,
        canActivate: [loginAuthGuard, adminPrivilegeGuard]
    },
    {
        path: 'users/login',
        component: LoginComponent
    }
    ,
    {
        path: 'users/register',
        component: RegisterComponent
    },
    {
        path: '**',
        component: NotFoundComponent,
        canActivate: [loginAuthGuard]

    },
    

];
