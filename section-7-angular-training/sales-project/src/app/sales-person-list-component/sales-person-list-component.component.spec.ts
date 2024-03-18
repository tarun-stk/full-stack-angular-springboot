import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonListComponentComponent } from './sales-person-list-component.component';

describe('SalesPersonListComponentComponent', () => {
  let component: SalesPersonListComponentComponent;
  let fixture: ComponentFixture<SalesPersonListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPersonListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPersonListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
