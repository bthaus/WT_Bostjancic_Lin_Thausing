import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogManagerCommentsComponent } from './dialog-manager-comments.component';

describe('DialogManagerCommentsComponent', () => {
  let component: DialogManagerCommentsComponent;
  let fixture: ComponentFixture<DialogManagerCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogManagerCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogManagerCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
