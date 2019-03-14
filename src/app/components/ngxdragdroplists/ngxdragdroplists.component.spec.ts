import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxdragdroplistsComponent } from './ngxdragdroplists.component';

describe('NgxdragdroplistsComponent', () => {
  let component: NgxdragdroplistsComponent;
  let fixture: ComponentFixture<NgxdragdroplistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxdragdroplistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxdragdroplistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
