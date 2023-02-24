import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
