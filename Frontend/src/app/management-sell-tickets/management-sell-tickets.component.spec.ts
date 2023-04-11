import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSellTicketsComponent } from './management-sell-tickets.component';

describe('ManagementSellTicketsComponent', () => {
  let component: ManagementSellTicketsComponent;
  let fixture: ComponentFixture<ManagementSellTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementSellTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementSellTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
