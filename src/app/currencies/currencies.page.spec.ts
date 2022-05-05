import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrenciesPage } from './currencies.page';

describe('CurrenciesPage', () => {
  let component: CurrenciesPage;
  let fixture: ComponentFixture<CurrenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
