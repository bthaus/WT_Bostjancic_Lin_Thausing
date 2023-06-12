import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEditorDialogComponent } from './review-editor-dialog.component';

describe('ReviewEditorDialogComponent', () => {
  let component: ReviewEditorDialogComponent;
  let fixture: ComponentFixture<ReviewEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
