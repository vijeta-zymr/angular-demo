import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkdroplistComponent } from './cdkdroplist.component';

describe('CdkdroplistComponent', () => {
  let component: CdkdroplistComponent;
  let fixture: ComponentFixture<CdkdroplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkdroplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkdroplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
