import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxdragdropComponent } from './ngxdragdrop.component';

describe('NgxdragdropComponent', () => {
  let component: NgxdragdropComponent;
  let fixture: ComponentFixture<NgxdragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxdragdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxdragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
