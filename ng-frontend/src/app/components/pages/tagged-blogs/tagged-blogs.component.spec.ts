import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedBlogsComponent } from './tagged-blogs.component';

describe('TaggedBlogsComponent', () => {
  let component: TaggedBlogsComponent;
  let fixture: ComponentFixture<TaggedBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggedBlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
