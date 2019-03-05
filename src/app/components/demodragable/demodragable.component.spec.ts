import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemodragableComponent } from './demodragable.component';

describe('DemodragableComponent', () => {
  let component: DemodragableComponent;
  let fixture: ComponentFixture<DemodragableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemodragableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemodragableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
