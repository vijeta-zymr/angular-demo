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
    {name: 'Link', id: 4},
    {name: 'Button', id: 5}
  ];
    public elementCount = 1;
    public size: number;
    public elementId: string;
    public elementValue: string;
    public elementText: string;
    public elementWidth: number;
    public elementHeight: number;

  constructor(elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  onElementDrop(e: DropEvent) {
    console.log('in element drop metthod', e.dragData);
    if (e.dragData.id === 1) {
      const input = this.renderer.createElement('input');
      this.renderer.setProperty(input, 'id', 'txt' + this.elementCount);
      this.renderer.setProperty(input, 'readonly', 'true');
      this.renderer.appendChild(this.div.nativeElement, input);
      this.renderer.listen(input, 'click', (event) => {
        console.log('onclick event', event);
        const target = event.target || event.srcElement || event.currentTarget;
        const Attr = target.attributes;
        this.elementId = Attr[0].ownerElement.id;
        this.size = Attr[0].ownerElement.size;
        this.elementValue = Attr[0].ownerElement.value;
        this.elementText = Attr[0].ownerElement.text;
        this.elementWidth = Attr[0].ownerElement.width;
        this.elementHeight = Attr[0].ownerElement.height;
      });
      this.elementCount ++;
      // input.addEventListener('click', this.onClick.bind(this));
      // this.div.nativeElement.insertAdjacentHTML('beforeend', '<input type="text" #text1 onclick="showProperty(1)">');
    } else if (e.dragData.id === 2) {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<label for="lbl" #lbl id="lbl' + this.elementCount + '">Label</label>');
      const elem: Element = document.getElementById('lbl' + this.elementCount);
      this.renderer.listen(elem, 'click', (event) => {
        console.log('onclick event', event);
        const target = event.target || event.srcElement || event.currentTarget;
        const Attr = target.attributes;
        this.elementId = Attr[0].ownerElement.id;
        this.size = Attr[0].ownerElement.size;
        this.elementValue = Attr[0].ownerElement.value;
        this.elementText = Attr[0].ownerElement.text;
        this.elementWidth = Attr[0].ownerElement.width;
        this.elementHeight = Attr[0].ownerElement.height;
      });
      this.elementCount ++;
    } else if (e.dragData.id === 3) {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<h1>Header</h1>');
    } else if (e.dragData.id === 4) {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<a href="#" id="link' + this.elementCount + '">Link</a>');
      const elem: Element = document.getElementById('link' + this.elementCount);
      this.renderer.listen(elem, 'click', (event) => {
        console.log('onclick event', event);
        const target = event.target || event.srcElement || event.currentTarget;
        const Attr = target.attributes;
        this.elementId = Attr[0].ownerElement.id;
        this.size = Attr[0].ownerElement.size;
        this.elementValue = Attr[0].ownerElement.value;
        this.elementText = Attr[0].ownerElement.text;
        this.elementWidth = Attr[0].ownerElement.width;
        this.elementHeight = Attr[0].ownerElement.height;
      });
      this.elementCount ++;
    } else if (e.dragData.id === 5) {
      const input = this.renderer.createElement('button');
      this.renderer.setProperty(input, 'id', 'btn' + this.elementCount);
      this.renderer.appendChild(this.div.nativeElement, input);
      this.renderer.listen(input, 'click', (event) => {
        console.log('onclick event', event);
        const target = event.target || event.srcElement || event.currentTarget;
        const Attr = target.attributes;
        this.elementId = Attr[0].ownerElement.id;
        this.size = Attr[0].ownerElement.size;
        this.elementValue = Attr[0].ownerElement.value;
        this.elementText = Attr[0].ownerElement.text;
        this.elementWidth = Attr[0].ownerElement.width;
        this.elementHeight = Attr[0].ownerElement.height;
      });
      this.elementCount ++;
      // input.addEventListener('click', this.onClick.bind(this));
      // this.div.nativeElement.insertAdjacentHTML('beforeend', '<input type="text" #text1 onclick="showProperty(1)">');
    } else {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<div></div>');
    }
  }
  onClick(event) {
    console.log('onclick event', event);
  }
  onPropertyChange(event: any, property: string) {
    console.log('on property change', event.target.value);
    const elem: Element = document.getElementById(this.elementId);
    this.renderer.setAttribute(elem, property, event.target.value);
  }
}
