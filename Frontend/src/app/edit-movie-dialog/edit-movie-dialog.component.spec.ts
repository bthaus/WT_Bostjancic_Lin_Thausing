import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieDialogComponent } from './edit-movie-dialog.component';

describe('EditMovieDialogComponent', () => {
  let component: EditMovieDialogComponent;
  let fixture: ComponentFixture<EditMovieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMovieDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
