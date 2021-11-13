import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayLotteryComponent } from './play-lottery.component';

describe('PlayLotteryComponent', () => {
  let component: PlayLotteryComponent;
  let fixture: ComponentFixture<PlayLotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayLotteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
