import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBlankComponent } from './menu-blank.component';

describe('MenuBlankComponent', () => {
  let component: MenuBlankComponent;
  let fixture: ComponentFixture<MenuBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
