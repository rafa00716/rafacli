import { ComponentFixture, TestBed } from '@angular/core/testing';

import { {{classCaseSingular}}ListComponent } from './{{kebakebabCaseSingularbCase}}-list.component';

describe('{{classCaseSingular}}ListComponent', () => {
  let component: {{classCaseSingular}}ListComponent;
  let fixture: ComponentFixture<{{classCaseSingular}}ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [{{classCaseSingular}}ListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent({{classCaseSingular}}ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
