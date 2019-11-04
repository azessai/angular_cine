import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapDemoComponent } from './tap-demo.component';

describe('TapDemoComponent', () => {
  let component: TapDemoComponent;
  let fixture: ComponentFixture<TapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
