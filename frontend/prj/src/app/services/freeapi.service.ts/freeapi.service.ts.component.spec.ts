import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Freeapi.Service.TsComponent } from './freeapi.service.ts.component';

describe('Freeapi.Service.TsComponent', () => {
  let component: Freeapi.Service.TsComponent;
  let fixture: ComponentFixture<Freeapi.Service.TsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Freeapi.Service.TsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Freeapi.Service.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
