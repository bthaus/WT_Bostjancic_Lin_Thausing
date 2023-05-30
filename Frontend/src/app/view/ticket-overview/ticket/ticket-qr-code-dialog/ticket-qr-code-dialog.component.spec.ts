import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketQrCodeDialogComponent } from './ticket-qr-code-dialog.component';

describe('TicketQrCodeDialogComponent', () => {
  let component: TicketQrCodeDialogComponent;
  let fixture: ComponentFixture<TicketQrCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketQrCodeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketQrCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
