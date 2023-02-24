import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
