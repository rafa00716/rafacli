import { ComponentFixture, TestBed } from '@angular/core/testing';

import { {{classCase}}ListComponent } from './{{kebabCase}}-list.component';

describe('{{classCase}}ListComponent', () => {
  let component: {{classCase}}ListComponent;
  let fixture: ComponentFixture<{{classCase}}ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [{{classCase}}ListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent({{classCase}}ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
