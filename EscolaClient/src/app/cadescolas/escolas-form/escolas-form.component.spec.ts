import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolasFormComponent } from './escolas-form.component';

describe('EscolasFormComponent', () => {
  let component: EscolasFormComponent;
  let fixture: ComponentFixture<EscolasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
