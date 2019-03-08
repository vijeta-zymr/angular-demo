import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DropEvent } from 'ng-drag-drop';

@Component({
  selector: 'app-dragable',
  templateUrl: './dragable.component.html',
  styleUrls: ['./dragable.component.css']
})
export class DragableComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  public elements = [
    {name: 'Textbox', id: 1},
    {name: 'Label', id: 2},
    {name: 'Header', id: 3},
    {name: 'Link', id: 4},
    {name: 'Button', id: 5},
    {name: 'Section', id: 6}
  ];
    public itemSelected: boolean;
    public item: string;
    public elementCount = 1;
    public elementId: string;
    public size: number;
    public displayPlaceholder: boolean;
    public placeholder: string;
    public displayElementValue: boolean;
    public elementValue: string;
    public displayElementText: boolean;
    public elementText: string;
    public displaySrc: boolean;
    public src: string;
    public elementWidth: number;
    public elementHeight: number;
    public selectedAlignValue = 1;
    public alignValues = [
      { id: 1, name: 'left' },
      { id: 2, name: 'right' },
      { id: 3, name: 'center' },
      { id: 4, name: 'justify' }
    ];
    public displayTableColums: boolean;
    public tableColumns: number;

  constructor(elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.itemSelected = false;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  onElementDrop(e: DropEvent) {
    console.log('in element drop metthod', e.dragData);
    if (e.dragData.id === 1) {
      this.item = 'TextBox';
      const dragdiv = this.renderer.createElement('div');
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('input');
      this.renderer.setProperty(input, 'id', 'txt' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.setStyle(input, 'width', '70px');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.div.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'textbox');
      // input.addEventListener('click', this.onClick.bind(this));
      // this.div.nativeElement.insertAdjacentHTML('beforeend', '<input type="textbox" #textbox1 onclick="showProperty(1)">');
    } else if (e.dragData.id === 2) {
      this.item = 'Label';
      const dragdiv = this.renderer.createElement('div');
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('label');
      const text = this.renderer.createText('label');
      this.renderer.appendChild(input, text);
      this.renderer.setProperty(input, 'id', 'lbl' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.div.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'label');
    } else if (e.dragData.id === 3) {
      this.item = 'Header';
      const dragdiv = this.renderer.createElement('div');
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('h1');
      const text = this.renderer.createText('h1');
      this.renderer.appendChild(input, text);
      this.renderer.setProperty(input, 'id', 'header' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.div.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'header');
    } else if (e.dragData.id === 4) {
      this.item = 'Link';
      const dragdiv = this.renderer.createElement('div');
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('a');
      const text = this.renderer.createText('link');
      this.renderer.appendChild(input, text);
      this.renderer.setProperty(input, 'id', 'link' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.div.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'link');
    } else if (e.dragData.id === 5) {
      this.item = 'Button';
      const dragdiv = this.renderer.createElement('div');
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('button');
      this.renderer.setProperty(input, 'id', 'btn' + this.elementCount);
      input.innerHTML = 'Click';
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.div.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'button');
    } else if (e.dragData.id === 6) {
      this.item = 'Table';
      const input = this.renderer.createElement('table');
      this.renderer.setProperty(input, 'id', 'tbl' + this.elementCount);
      input.innerHTML = 'Click me!!';
      this.renderer.appendChild(this.div.nativeElement, input);
      this.setPropertiesOfElement(input, 'table');
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
      this.itemSelected = true;
      this.item = type;
      const target = event.target || event.srcElement || event.currentTarget;
      const Attr = target.attributes;
      // fetch id of elemennt
      this.elementId = Attr[0].ownerElement.id;
      // fetch value of element
      if (type === 'textbox') {
        this.size = Attr[0].ownerElement.size;
        this.displayElementValue = true;
        this.elementValue = Attr[0].ownerElement.value;
        this.displayPlaceholder = true;
        this.placeholder = Attr[0].ownerElement.placeholder;
      } else {
        this.size = null;
        this.displayElementValue = false;
        this.elementValue = null;
        this.displayPlaceholder = false;
        this.placeholder = null;
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
      // set column of table
      this.displayTableColums = true;
    });
    this.elementCount ++;
    this.displaySrc = true;
  }
  onPropertyChange(event: any, property: string, pc: number) {
    console.log('pc', pc);
    if (pc === 2) {
      const elem: Element = document.getElementById(this.elementId).parentElement;
      this.renderer.setStyle(elem, property, event.target.value + 'px');
    } else {
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
      } else if (property === 'column') {
        elem.innerHTML = '';
        const tr = this.renderer.createElement('tr');
        this.renderer.appendChild(elem, tr);
        for (let tdi = 1; tdi <= event.target.value; tdi++) {
          const td = this.renderer.createElement('td');
          this.renderer.appendChild(tr, td);
        }
      } else {
        this.renderer.setAttribute(elem, property, event.target.value);
      }
    }
  }
  alignValueChange(event: any) {
    if (this.elementId) {
      const changedAlignValue = this.alignValues.find(i => i.id === +this.selectedAlignValue);
      const elem: Element = document.getElementById(this.elementId).parentElement;
      this.renderer.setStyle(elem, 'text-align', changedAlignValue.name);
    }
  }
}
