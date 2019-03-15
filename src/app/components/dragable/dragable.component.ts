import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DropEvent } from 'ng-drag-drop';
import { DndDropEvent } from 'ngx-drag-drop';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  drag(ev) {
    console.log('drag', ev.target.id);
    ev.dataTransfer.setData('id', ev.target.id);
    ev.dataTransfer.setData('effect', 'create');
  }
  dragEnd(ev) {
    console.log('dragEnd', ev);
    ev.dataTransfer.setData('id', ev.target.id);
    ev.dataTransfer.setData('effect', 'create');
    this.onElementDrop(ev);
  }
  dragStared(ev) {
    console.log('drag started method', ev);
    ev.dataTransfer.setData('effect', 'move');
    ev.dataTransfer.setData('divId', ev.srcElement.id);
    ev.dataTransfer.setData('x', ev.clientX);
    ev.dataTransfer.setData('y', ev.clientY);
  }
  onElementDrop(e, parentDivElement?: any) {
    e.preventDefault();
    const effect = e.dataTransfer.getData('effect');
    console.log('drop method', effect);
    if (effect === 'create') {
      const id = e.dataTransfer.getData('id');
      console.log('in element drop metthod', id);
      if (id === '1') {
        this.item = 'TextBox';
        const dragdiv = this.renderer.createElement('div');
        this.renderer.setProperty(dragdiv, 'id', 'div' + this.elementCount);
        // set draggable attribute for new div element
        // ng-drag-drop method
        // this.renderer.setAttribute(dragdiv, 'draggable', 'true');
        // this.renderer.setAttribute(dragdiv, 'dragClass', 'drag-over');
        // ngx-drag-drop method
        // this.renderer.setAttribute(dragdiv, 'draggable', 'true');
        // this.renderer.setAttribute(dragdiv, 'dndDraggable', 'abc');
        // this.renderer.setAttribute(dragdiv, 'ng-reflect-dnd-draggable', 'abc');
        this.renderer.setAttribute(dragdiv, 'draggable', 'true');
        this.renderer.listen(dragdiv, 'dragstart', (ev) => {
          console.log('Drag started');
          this.dragStared(ev);
        });
        this.renderer.listen(dragdiv, 'dragend', (ev) => {
          console.log('Drag End');
          this.dragEnd(ev);
        });
        this.renderer.setAttribute(dragdiv, 'class', 'border-div');
        const input = this.renderer.createElement('input');
        const button = this.renderer.createElement('button');
        const buttontext = this.renderer.createText('swap');
        this.renderer.listen(button, 'click', (ev) => {
          console.log('Button Click');
          this.buttonChangeClick(ev);
        });
        this.renderer.setProperty(input, 'id', 'txt' + this.elementCount);
        this.renderer.setAttribute(input, 'readonly', 'true');
        this.renderer.setStyle(input, 'width', '150px');
        this.renderer.appendChild(dragdiv, input);
        this.renderer.appendChild(button, buttontext);
        this.renderer.appendChild(dragdiv, button);
        if (parentDivElement) {
          const PDE: Element = document.getElementById(parentDivElement);
          this.renderer.appendChild(PDE, dragdiv);
        } else {
          this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
        }
        this.setPropertiesOfElement(input, 'textbox');
        // input.addEventListener('click', this.onClick.bind(this));
        // this.mainDroppableDiv.nativeElement.insertAdjacentHTML('beforeend',
        //  '<input type="textbox" #textbox1 onclick="showProperty(1)">');
      } else if (id === '2') {
        this.item = 'Label';
        const dragdiv = this.renderer.createElement('div');
        this.renderer.setProperty(dragdiv, 'id', 'div' + this.elementCount);
        // set draggable attribute for new div element
        this.renderer.setAttribute(dragdiv, 'draggable', 'true');
        this.renderer.listen(dragdiv, 'dragstart', (ev) => {
          console.log('Drag started');
          this.dragStared(ev);
        });
        this.renderer.setAttribute(dragdiv, 'class', 'border-div');
        const input = this.renderer.createElement('label');
        const text = this.renderer.createText('label');
        const button = this.renderer.createElement('button');
        this.renderer.listen(button, 'click', (ev) => {
          console.log('Button Click');
          this.buttonChangeClick(ev);
        });
        const buttontext = this.renderer.createText('swap');
        this.renderer.appendChild(input, text);
        this.renderer.appendChild(button, buttontext);
        this.renderer.setProperty(input, 'id', 'lbl' + this.elementCount);
        this.renderer.setAttribute(input, 'readonly', 'true');
        this.renderer.setStyle(input, 'width', '150px');
        this.renderer.appendChild(dragdiv, input);
        this.renderer.appendChild(dragdiv, button);
        this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
        this.setPropertiesOfElement(input, 'label');
      } else if (id === '3') {
        this.item = 'Header';
        const dragdiv = this.renderer.createElement('div');
        this.renderer.setProperty(dragdiv, 'id', 'div' + this.elementCount);
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
      } else if (id === '4') {
        this.item = 'Link';
        const dragdiv = this.renderer.createElement('div');
        this.renderer.setProperty(dragdiv, 'id', 'div' + this.elementCount);
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
      } else if (id === '5') {
        this.item = 'Button';
        const dragdiv = this.renderer.createElement('div');
        this.renderer.setProperty(dragdiv, 'id', 'div' + this.elementCount);
        // set draggable attribute for new div element
        this.renderer.setAttribute(dragdiv, 'class', 'border-div');
        const input = this.renderer.createElement('button');
        this.renderer.setProperty(input, 'id', 'btn' + this.elementCount);
        input.innerHTML = 'Click';
        this.renderer.appendChild(dragdiv, input);
        this.renderer.appendChild(this.mainDroppableDiv.nativeElement, dragdiv);
        this.setPropertiesOfElement(input, 'button');
      } else if (id === '6') {
        this.item = 'Table';
        const input = this.renderer.createElement('table');
        this.renderer.setProperty(input, 'id', 'tbl' + this.elementCount);
        input.innerHTML = 'Click me!!';
        this.renderer.insertBefore(this.replaceChildElement.nativeElement, input, this.mainDroppableDiv.nativeElement);
        this.setPropertiesOfElement(input, 'table');
      } else {
        this.mainDroppableDiv.nativeElement.insertAdjacentHTML('beforeend', '<div></div>');
      }
    } else if (effect === 'move') {
      const x = e.dataTransfer.getData('x');
      const y = e.dataTransfer.getData('y');
      const divId = e.dataTransfer.getData('divId');
      const divElem: Element = document.getElementById(divId);
      this.renderer.setStyle(divElem, 'position', 'absolute');
      this.renderer.setStyle(divElem, 'left', x + 'px');
      this.renderer.setStyle(divElem, 'top', y + 'px');
    } else {

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
      console.log('this.elementId', this.elementId);
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
          this.renderer.setProperty(dropableDiv, 'id', 'tableDiv' + tdi);
          // assign droppable attribute to new generated div
          // this.renderer.addClass(dropableDiv, 'card card-outline-primary mb-3');
          this.renderer.setStyle(dropableDiv, 'width', '100%');
          this.renderer.setStyle(dropableDiv, 'height', '100%');
          this.renderer.setStyle(dropableDiv, 'border', '1px solid red');
          // dropableDiv.addEventListener('drop', (ev) => {
          //   console.log('renderer drop event listener');
          //   this.onElementDrop(ev);
          // });
          this.renderer.listen(dropableDiv, 'drop', (ev) => {
            console.log('renderer onDrop event');
            this.onElementMove(ev);
          });
          this.renderer.listen(dropableDiv, 'dragover', (ev) => {
            console.log('renderer dragover event');
            this.allowDrop(ev);
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
    const parentDivElement = event.srcElement.parentElement.children[0].id;
    console.log('parentDivElement', parentDivElement);
    this.onElementDrop(event, parentDivElement);
  }

  // cdk drag drop events -------------------------------------------------------------
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log('on element drop via cdk', event);
  //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  // }
  // dropStatic(event: CdkDragDrop<string[]>) {
  //   // moveItemInArray(this.myForm.get('items').controls, event.previousIndex, event.currentIndex);
  //   moveItemInArray(this.myForm.get('items').value, event.previousIndex, event.currentIndex);
  // }
  //  onDragEnded(event: CdkDragEnd) {
  //   console.log('on drag ended event', event);
  //   event.source.element.nativeElement.style.transform = 'none'; // visually reset element to its origin
  //   const source: any = event.source;
  //   source._passiveTransform = { x: 0, y: 0 }; // make it so new drag starts from same origin
  // }

  // dnd drag drop events ------------------------------------------------------------
  // onDragStart(event: DragEvent) {
  //   console.log('drag started', JSON.stringify(event, null, 2));
  // }
  // onDragEnd(event: DragEvent) {
  //   console.log('drag ended', JSON.stringify(event, null, 2));
  // }
  // onDraggableCopied(event: DragEvent) {
  //   console.log('draggable copied', JSON.stringify(event, null, 2));
  // }
  // onDraggableLinked(event: DragEvent) {
  //   console.log('draggable linked', JSON.stringify(event, null, 2));
  // }
  // onDraggableMoved(event: DragEvent) {
  //   console.log('draggable moved', JSON.stringify(event, null, 2));
  // }
  // onDragCanceled(event: DragEvent) {
  //   console.log('drag cancelled', JSON.stringify(event, null, 2));
  // }
  // onDragover(event: DragEvent) {
  //   console.log('dragover', JSON.stringify(event, null, 2));
  // }
  buttonChangeClick(e) {
    console.log('button click', e);
    const current: Element = document.getElementById(e.srcElement.parentElement.id);
    const clon: Element = current;
    console.log('clon', clon);
    this.renderer.appendChild(this.mainDroppableDiv.nativeElement, clon);
    // current.remove();
  }
}
