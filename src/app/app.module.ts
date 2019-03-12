import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgDragDropModule } from 'ng-drag-drop';
import { DndModule } from 'ng2-dnd';
import { DragDropModule } from '@angular/cdk/drag-drop';
// self-made components
import { SearchListComponent } from './search-list/search-list.component';
import { SearchTextComponent } from './search-text/search-text.component';
import { DragableComponent } from './components/dragable/dragable.component';
import { DemodragableComponent } from './components/demodragable/demodragable.component';
import { CdkdroplistComponent } from './components/cdkdroplist/cdkdroplist.component';

@NgModule({
  declarations: [AppComponent, SearchListComponent, SearchTextComponent, DragableComponent, DemodragableComponent, CdkdroplistComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgDragDropModule.forRoot(),
    DndModule.forRoot(),
    DragDropModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
