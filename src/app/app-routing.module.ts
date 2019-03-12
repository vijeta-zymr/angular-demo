import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchTextComponent } from './search-text/search-text.component';
import { DragableComponent } from './components/dragable/dragable.component';
import { DemodragableComponent } from './components/demodragable/demodragable.component';
import { CdkdroplistComponent } from './components/cdkdroplist/cdkdroplist.component';


const routes: Routes = [
  {
    path: 'demo-dragable',
    component: DemodragableComponent
  },
  {
    path: 'cdkdroplist',
    component: CdkdroplistComponent
  },
  {
    path: '',
    component: DragableComponent
  },
  {
    path: 'search-text',
    component: SearchTextComponent
  },
  {
    path: 'search-list',
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
