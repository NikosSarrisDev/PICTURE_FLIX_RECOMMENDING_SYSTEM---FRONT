import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommenderOnOverviewComponent } from './recommender-on-overview.component';

describe('RecommenderOnOverviewComponent', () => {
  let component: RecommenderOnOverviewComponent;
  let fixture: ComponentFixture<RecommenderOnOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommenderOnOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommenderOnOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
