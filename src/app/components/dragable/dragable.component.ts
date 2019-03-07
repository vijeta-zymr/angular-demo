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
    public item: string;
    public elementCount = 1;
    public elementId: string;
    public size: number;
    public displayElementValue: boolean;
    public elementValue: string;
    public displayElementText: boolean;
    public elementText: string;
    public displaySrc: boolean;
    public src: string;
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
      this.item = 'TextBox';
      const dragdiv = this.renderer.createElement('div');
      const input = this.renderer.createElement('input');
      this.renderer.setProperty(input, 'id', 'txt' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.div.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'textbox');
      // input.addEventListener('click', this.onClick.bind(this));
      // this.div.nativeElement.insertAdjacentHTML('beforeend', '<input type="textbox" #textbox1 onclick="showProperty(1)">');
    } else if (e.dragData.id === 2) {
      this.item = 'Label';
      this.div.nativeElement.insertAdjacentHTML('beforeend',
       '<div draggable="true" class="drag-handle" ng-reflect-drag-class="drag-over" ng-reflect-drag-data=' +
       {name: 'Label', id: 'lbl' + this.elementCount} + '><label for="lbl" id="lbl' + this.elementCount + '">Label</label></div>');
      const elem: Element = document.getElementById('lbl' + this.elementCount);
      this.setPropertiesOfElement(elem, 'label');
    } else if (e.dragData.id === 3) {
      this.item = 'Header';
      this.div.nativeElement.insertAdjacentHTML('beforeend',
       '<div draggable="true" class="drag-handle" ng-reflect-drag-class="drag-over" ng-reflect-drag-data=' +
       {name: 'Header', id: 'lbl' + this.elementCount} + '><h1 id="header' + this.elementCount + '">Header</h1></div>');
      const elem: Element = document.getElementById('header' + this.elementCount);
      this.setPropertiesOfElement(elem, 'header');
    } else if (e.dragData.id === 4) {
      this.item = 'Link';
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<a href="#" id="link' + this.elementCount + '" readonly>Link</a>');
      const elem: Element = document.getElementById('link' + this.elementCount);
      this.setPropertiesOfElement(elem, 'link');
    } else if (e.dragData.id === 5) {
      this.item = 'Button';
      const input = this.renderer.createElement('button');
      this.renderer.setProperty(input, 'id', 'btn' + this.elementCount);
      input.innerHTML = 'Click me!!';
      this.renderer.appendChild(this.div.nativeElement, input);
      this.setPropertiesOfElement(input, 'button');
    } else {
      this.div.nativeElement.insertAdjacentHTML('beforeend', '<div></div>');
    }
  }
  onClick(event) {
    console.log('onclick event', event);
  }
  setPropertiesOfElement(input: Element, type: string) {
    this.renderer.listen(input, 'click', (event) => {
      console.log('onclick event', input);
      this.item = type;
      const target = event.target || event.srcElement || event.currentTarget;
      const Attr = target.attributes;
      // fetch id of elemennt
      this.elementId = Attr[0].ownerElement.id;
      // fetch size of textboxbox
      if (type === 'textbox') {
        this.size = Attr[0].ownerElement.size;
      } else {
        this.size = null;
      }
      // fetch value of element
      if (type === 'textbox') {
        this.displayElementValue = true;
        this.elementValue = Attr[0].ownerElement.value;
      } else {
        this.displayElementValue = false;
        this.elementValue = null;
      }
      // fetch textbox of element
      if (type === 'label' || type === 'header' || type === 'link' || type === 'button') {
        this.displayElementText = true;
        this.elementText = Attr[0].ownerElement.textbox;
      } else {
        this.displayElementText = false;
        this.elementText = null;
      }
      // fetch href of element
      if (type === 'link') {
        this.displaySrc = true;
        this.src = (Attr[0].ownerElement.href).replace('http://localhost:4200/', '');
      } else {
        this.displaySrc = false;
        this.src = null;
      }
      // fetch width of element
      this.elementWidth = Attr[0].ownerElement.width;
      // fetch height of element
      this.elementHeight = Attr[0].ownerElement.height;
    });
    this.elementCount ++;
  }
  onPropertyChange(event: any, property: string) {
    const elem: Element = document.getElementById(this.elementId);
    console.log('on property change', elem);
    if (property === 'text') {
      elem.innerHTML = event.target.value;
    } else if (property === 'href' && event.target.value === '') {
      this.renderer.removeAttribute(elem, property);
    } else if (property === 'href' && event.target.value !== '') {
      this.renderer.setAttribute(elem, property, '#' + event.target.value);
    } else if (property === 'width' || property === 'height') {
      this.renderer.setStyle(elem, property, event.target.value + 'px');
    } else {
      this.renderer.setAttribute(elem, property, event.target.value);
    }
  }
}
