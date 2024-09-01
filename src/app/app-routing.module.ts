// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { JWTStorage } from './services/JWTStorage';

const routes = [
  {
    path: '',
    component: AdminComponent,
    loginRequired: true,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path:'',
        redirectTo: !isLoggedIn()? '/login':'',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

function isLoggedIn() {
  const jwt = new JWTStorage();
  return Boolean(jwt.getToken());
}

function filterRoutes(routes): Routes {
  const jwt =new JWTStorage();
  const token = jwt.getToken();
  return routes.filter((route) => {
   return route.loginRequired ? Boolean(token) : true;
  }).map((route) => {
    return {
      path: route.path,
      component: route.component,
      children: route.children
    }
  })
}

@NgModule({
  imports: [RouterModule.forRoot(filterRoutes(routes))],
  exports: [RouterModule]
})
export class AppRoutingModule {}
