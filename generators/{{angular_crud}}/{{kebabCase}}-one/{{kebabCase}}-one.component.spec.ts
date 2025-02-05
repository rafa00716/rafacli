import { ComponentFixture, TestBed } from '@angular/core/testing';

import { {{classCase}}OneComponent } from './{{kebabCase}}-one.component';

describe('{{classCase}}OneComponent', () => {
  let component: {{classCase}}OneComponent;
  let fixture: ComponentFixture<{{classCase}}OneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [{{classCase}}OneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent({{classCase}}OneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
