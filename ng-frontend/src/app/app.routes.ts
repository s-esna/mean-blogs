import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { loginAuthGuard } from './service/guards/login-auth.guard';
import { AddBlogComponent } from './components/pages/add-blog/add-blog.component';
import { adminPrivilegeGuard } from './service/guards/admin-privilege.guard';
import { UsersComponent } from './components/pages/users/users.component';
import { TaggedBlogsComponent } from './components/pages/tagged-blogs/tagged-blogs.component';

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
        path: 'blogs/tagged/:tag',
        component: TaggedBlogsComponent,
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
