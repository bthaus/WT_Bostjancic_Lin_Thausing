import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDatePickerComponent } from './movie-date-picker.component';

describe('MovieDatePickerComponent', () => {
  let component: MovieDatePickerComponent;
  let fixture: ComponentFixture<MovieDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
