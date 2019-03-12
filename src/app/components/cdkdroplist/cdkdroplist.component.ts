import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Student } from './student.model';
import { StudentService } from './student.service';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-cdkdroplist',
  templateUrl: './cdkdroplist.component.html',
  styleUrls: ['./cdkdroplist.component.css']
})
export class CdkdroplistComponent implements OnInit {
  myForm: FormGroup;
  activeNote: string;
  students: Student[] = [];
  students2: Student[] = [
      {
          name: 'Siddharth'
      },
      {
          name: 'Jay'
      },
      {
          name: 'Jaydeep'
      },
      {
          name: 'Chirag'
      }];
  constructor(private studentservice: StudentService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['title'],
      items: fb.array([
        fb.group({
          name: fb.control('1'),
          note: fb.control('quux')
        }),
        fb.group({
          name: fb.control('2'),
          note: fb.control('bar')
        }),
        fb.group({
          name: fb.control('3'),
          note: fb.control('baz')
        })
      ])
    });
   }

  drop(event: CdkDragDrop<string[]>) {
    console.log('on element drop via cdk', event);
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
    transferArrayItem(event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex);
    }
  }

  ngOnInit() {
    const studentsObservable = this.studentservice.getStudents();
    studentsObservable.subscribe((studentsData: Student[]) => {
        this.students = studentsData;
    });
  }

  dropSecond(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.myForm.get('items').controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.myForm.get('items').value, event.previousIndex, event.currentIndex);
  }
  enter(i) {
    this.activeNote = this.myForm.get('items')['controls'][i].get('note').value;
  }
}
