import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleboardComponent } from './articleboard.component';

describe('ArticleboardComponent', () => {
  let component: ArticleboardComponent;
  let fixture: ComponentFixture<ArticleboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
