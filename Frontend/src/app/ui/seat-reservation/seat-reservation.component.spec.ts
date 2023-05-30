import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatReservationComponent } from './seat-reservation.component';

describe('SeatReservationComponent', () => {
  let component: SeatReservationComponent;
  let fixture: ComponentFixture<SeatReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
