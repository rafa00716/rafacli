import { ComponentFixture, TestBed } from '@angular/core/testing';

import { {{classCaseSingular}}OneComponent } from './{{kebabCaseSingular}}-one.component';

describe('{{classCaseSingular}}OneComponent', () => {
  let component: {{classCaseSingular}}OneComponent;
  let fixture: ComponentFixture<{{classCaseSingular}}OneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [{{classCaseSingular}}OneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent({{classCaseSingular}}OneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
