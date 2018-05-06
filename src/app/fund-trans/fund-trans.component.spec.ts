import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTransComponent } from './fund-trans.component';

describe('FundTransComponent', () => {
  let component: FundTransComponent;
  let fixture: ComponentFixture<FundTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
