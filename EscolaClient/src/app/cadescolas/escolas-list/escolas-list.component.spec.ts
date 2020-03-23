import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolasListComponent } from './escolas-list.component';

describe('EscolasListComponent', () => {
  let component: EscolasListComponent;
  let fixture: ComponentFixture<EscolasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
