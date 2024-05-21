import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqsflowComponent } from './sqsflow.component';

describe('SqsflowComponent', () => {
  let component: SqsflowComponent;
  let fixture: ComponentFixture<SqsflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqsflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqsflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
