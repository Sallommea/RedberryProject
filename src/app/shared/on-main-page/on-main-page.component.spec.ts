import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnMainPageComponent } from './on-main-page.component';

describe('OnMainPageComponent', () => {
  let component: OnMainPageComponent;
  let fixture: ComponentFixture<OnMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
