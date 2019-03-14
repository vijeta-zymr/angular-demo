import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DropEvent } from 'ng-drag-drop';
import { DndDropEvent } from 'ngx-drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-dragable',
  templateUrl: './dragable.component.html',
  styleUrls: ['./dragable.component.css']
})
export class DragableComponent implements OnInit {
  // myForm: FormGroup;
  @ViewChild('replaceChildElement') replaceChildElement: ElementRef;
  @ViewChild('mainDroppableDiv') mainDroppableDiv: ElementRef;

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

  constructor(elRef: ElementRef, private renderer: Renderer2, private fb: FormBuilder) {
    // this.myForm = this.fb.group({
    //   title: ['title'],
    //   items: fb.array([
    //     fb.group({
    //       name: fb.control('1'),
    //       field: fb.control('header')
    //     }),
    //     fb.group({
    //       name: fb.control('2'),
    //       field: fb.control('label')
    //     }),
    //     fb.group({
    //       name: fb.control('3'),
    //       field: fb.control('link')
    //     })
    //   ])
    // });
  }

  ngOnInit() {
    this.itemSelected = false;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  onElementDrop(e: DropEvent) {
    console.log('in element drop metthod', e);
    if (e.dragData.id === 1) {
      this.item = 'TextBox';
      const dragdiv = this.renderer.createElement('div');
      // set draggable attribute for new div element
      // ng-drag-drop method
      this.renderer.setAttribute(dragdiv, 'draggable', 'true');
      this.renderer.setAttribute(dragdiv, 'dragClass', 'drag-over');
      // ng2-dnd method
      // this.renderer.setAttribute(dragdiv, 'dnd-draggable', 'true');
      // this.renderer.setAttribute(dragdiv, 'dragEnabled', 'true');
      // this.renderer.setAttribute(dragdiv, 'dragData', dragdiv);
      // ngx-drag-drop method
      // this.renderer.setAttribute(dragdiv, 'draggable', 'true');
      // this.renderer.setAttribute(dragdiv, 'dndDraggable', 'abc');
      // this.renderer.setAttribute(dragdiv, 'ng-reflect-dnd-draggable', 'abc');
      // this.renderer.listen(dragdiv, 'dndEnd', (ev) => {
      //   console.log('Drag Ended');
      // });
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('input');
      this.renderer.setProperty(input, 'id', 'txt' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.setStyle(input, 'width', '150px');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'textbox');
      // input.addEventListener('click', this.onClick.bind(this));
      // this.mainDroppableDiv.nativeElement.insertAdjacentHTML('beforeend', '<input type="textbox" #textbox1 onclick="showProperty(1)">');
    } else if (e.dragData.id === 2) {
      this.item = 'Label';
      const dragdiv = this.renderer.createElement('div');
      // set draggable attribute for new div element
      // ng-drag-drop method
      this.renderer.setAttribute(dragdiv, 'draggable', 'true');
      this.renderer.setAttribute(dragdiv, 'dragClass', 'drag-over');
      // ng2-dnd method
      // this.renderer.setAttribute(dragdiv, 'dnd-draggable', 'true');
      // this.renderer.setAttribute(dragdiv, 'dragEnabled', 'true');
      // this.renderer.setAttribute(dragdiv, 'dragData', dragdiv);
      // ngx-drag-drop method
      // this.renderer.setAttribute(dragdiv, 'dndDraggable', dragdiv);
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('label');
      const text = this.renderer.createText('label');
      this.renderer.appendChild(input, text);
      this.renderer.setProperty(input, 'id', 'lbl' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'label');
    } else if (e.dragData.id === 3) {
      this.item = 'Header';
      const dragdiv = this.renderer.createElement('div');
      // set draggable attribute for new div element
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('h1');
      const text = this.renderer.createText('h1');
      this.renderer.appendChild(input, text);
      this.renderer.setProperty(input, 'id', 'header' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'header');
    } else if (e.dragData.id === 4) {
      this.item = 'Link';
      const dragdiv = this.renderer.createElement('div');
      // set draggable attribute for new div element
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('a');
      const text = this.renderer.createText('link');
      this.renderer.appendChild(input, text);
      this.renderer.setProperty(input, 'id', 'link' + this.elementCount);
      this.renderer.setAttribute(input, 'readonly', 'true');
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'link');
    } else if (e.dragData.id === 5) {
      this.item = 'Button';
      const dragdiv = this.renderer.createElement('div');
      // set draggable attribute for new div element
      this.renderer.setAttribute(dragdiv, 'class', 'border-div');
      const input = this.renderer.createElement('button');
      this.renderer.setProperty(input, 'id', 'btn' + this.elementCount);
      input.innerHTML = 'Click';
      this.renderer.appendChild(dragdiv, input);
      this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
      this.setPropertiesOfElement(input, 'button');
    } else if (e.dragData.id === 6) {
      this.item = 'Table';
      const input = this.renderer.createElement('table');
      this.renderer.setProperty(input, 'id', 'tbl' + this.elementCount);
      input.innerHTML = 'Click me!!';
      this.renderer.insertBefore(this.replaceChildElement.nativeElement, input, this.mainDroppableDiv.nativeElement);
      this.setPropertiesOfElement(input, 'table');
    } else {
      this.mainDroppableDiv.nativeElement.insertAdjacentHTML('beforeend', '<div></div>');
    }
  }
  // onClick(event) {
  //   console.log('onclick event abcdss', event);
  // }
  setPropertiesOfElement(input: Element, type: string) {
    this.renderer.listen(input, 'click', (event) => {
      console.log('onclick event', input);
      this.itemSelected = true;
      this.item = type;
      const target = event.target || event.srcElement || event.currentTarget;
      const Attr = target.attributes;
      // fetch id of elemennt
      this.elementId = Attr[0].ownerElement.id;
      console.log('this.elementId',this.elementId);
      // fetch value of element
      if (type === 'textbox') {
        console.log('in if');
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
      if (type === 'table') {
        this.displayTableColums = true;
      } else {
        this.displayTableColums = false;
      }
    });
    this.elementCount ++;
    this.displaySrc = true;
  }
  onPropertyChange(event: any, property: string, pc: number) {
    console.log('on property change method');
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
        // remove original droppable div
        // this.renderer.removeAttribute(this.mainDroppableDiv.nativeElement, 'dnd-droppable');
        // this.renderer.removeAttribute(this.mainDroppableDiv.nativeElement, 'onDropSuccess');
        // this.mainDroppableDiv.nativeElement.remove();
        this.renderer.setStyle(this.mainDroppableDiv.nativeElement, 'border', '1px solid red');
        elem.innerHTML = '';
        const tr = this.renderer.createElement('tr');
        this.renderer.appendChild(elem, tr);
        for (let tdi = 1; tdi <= event.target.value; tdi++) {
          const td = this.renderer.createElement('td');
          this.renderer.appendChild(tr, td);
          const dropableDiv = this.renderer.createElement('div');
          // assign droppable attribute to new generated div
          // this.renderer.addClass(dropableDiv, 'card card-outline-primary mb-3');
          this.renderer.setStyle(dropableDiv, 'width', '100%');
          this.renderer.setStyle(dropableDiv, 'height', '100%');
          this.renderer.setStyle(dropableDiv, 'border', '1px solid red');
          this.renderer.setAttribute(dropableDiv, 'dndDropzone', 'true');
          // dropableDiv.addEventListener('onDrop', (ev) => {
          //   console.log('renderer ondrop event listener');
          // });
          this.renderer.listen(dropableDiv, 'dndDrop', (ev) => {
            console.log('renderer onDrop event renderer');
            this.onElementMove(ev);
          });
          this.renderer.appendChild(td, dropableDiv);
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
  onElementMove(event: any) {
    console.log('on element move', event);
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log('on element drop via cdk', event);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
  onDragStart(event: DragEvent) {
    console.log('drag started method', JSON.stringify(event, null, 2));
  }
  onDragEnd(event: DragEvent) {
    console.log('drag ended', JSON.stringify(event, null, 2));
  }
  onDragover(event: DragEvent) {
    console.log('dragover', JSON.stringify(event, null, 2));
  }
  // dropStatic(event: CdkDragDrop<string[]>) {
  //   // moveItemInArray(this.myForm.get('items').controls, event.previousIndex, event.currentIndex);
  //   moveItemInArray(this.myForm.get('items').value, event.previousIndex, event.currentIndex);
  // }
  dndMoved(i: any) {
    console.log('in dnd moved event');
  }
}
