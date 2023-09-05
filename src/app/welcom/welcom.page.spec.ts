import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomPage } from './welcom.page';

describe('WelcomPage', () => {
  let component: WelcomPage;
  let fixture: ComponentFixture<WelcomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WelcomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
