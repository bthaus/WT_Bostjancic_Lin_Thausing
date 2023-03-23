import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreManagingComponent } from './theatre-managing.component';

describe('TheatreManagingComponent', () => {
  let component: TheatreManagingComponent;
  let fixture: ComponentFixture<TheatreManagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreManagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatreManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
