import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHallsComponent } from './dialog-halls.component';

describe('DialogHallsComponent', () => {
  let component: DialogHallsComponent;
  let fixture: ComponentFixture<DialogHallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHallsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
