import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSellTicketsComponent } from './dialog-sell-tickets.component';

describe('DialogSellTicketsComponent', () => {
  let component: DialogSellTicketsComponent;
  let fixture: ComponentFixture<DialogSellTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSellTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSellTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
