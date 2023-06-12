import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatTheatremanagerDialogComponent } from './seat-theatremanager-dialog.component';

describe('SeatTheatremanagerDialogComponent', () => {
  let component: SeatTheatremanagerDialogComponent;
  let fixture: ComponentFixture<SeatTheatremanagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatTheatremanagerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatTheatremanagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
