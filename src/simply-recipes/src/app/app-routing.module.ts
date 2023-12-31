import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {
      title: 'Privacy'
    }
  },
  {
    path: 'contacts',
    component: ContactComponent,
    data: {
      title: 'Contacts'
    }
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      title: 'FAQ'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
    canActivate: [AdminGuard],
    data: {
      isAdministrator: true
    }
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: {
      title: 'Not Found'
    }
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
