import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoonComponent } from './soon.component';

describe('SoonComponent', () => {
  let component: SoonComponent;
  let fixture: ComponentFixture<SoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
