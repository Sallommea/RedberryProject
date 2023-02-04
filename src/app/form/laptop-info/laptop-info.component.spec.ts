import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopInfoComponent } from './laptop-info.component';

describe('LaptopInfoComponent', () => {
  let component: LaptopInfoComponent;
  let fixture: ComponentFixture<LaptopInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaptopInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaptopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
