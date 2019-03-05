import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DropEvent } from 'ng-drag-drop';

@Component({
  selector: 'app-dragable',
  templateUrl: './dragable.component.html',
  styleUrls: ['./dragable.component.css']
})
export class DragableComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  elements = [
    {name: 'Textbox', id: 1},
    {name: 'Label', id: 2},
    {name: 'Header', id: 3},
    {name: 'Link', id: 4}];

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  onElementDrop(e: DropEvent) {
    console.log('in element drop metthod', e.dragData);
    if (e.dragData.id === 1) {
      const input = this.renderer.createElement('input');
      this.renderer.appendChild(this.div.nativeElement, input);
      // this.div.nativeElement.insertAdjacentHTML('beforeend', '<input type="text" #text1 onclick="showProperty(1)">');
    } else if (e.dragData.id === 2) {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<label for="lbl" onclick="showProperty(2);">Label</label>');
    } else if (e.dragData.id === 3) {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<h1>Header</h1>');
    } else if (e.dragData.id === 4) {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<a href="#">Link</a>');
    } else {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<div></div>');
    }
  }

  showProperty(element: number) {
    console.log('element id', element);
  }
}
