import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatVoltaireComponent } from './certificat-voltaire.component';

describe('CertificatVoltaireComponent', () => {
  let component: CertificatVoltaireComponent;
  let fixture: ComponentFixture<CertificatVoltaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatVoltaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatVoltaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
