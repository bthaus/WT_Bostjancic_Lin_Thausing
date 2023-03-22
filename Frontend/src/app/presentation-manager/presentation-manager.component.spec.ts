import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationManagerComponent } from './presentation-manager.component';

describe('PresentationManagerComponent', () => {
  let component: PresentationManagerComponent;
  let fixture: ComponentFixture<PresentationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
