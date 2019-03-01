import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchTextComponent } from './search-text/search-text.component';


const routes: Routes = [
  {
    path: '',
    component: SearchTextComponent
  },
  {
    path: 'search-list/:user',
    component: SearchListComponent
  },
  {
    path: 'search-list/:user/:repos/:follow',
    component: SearchListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
