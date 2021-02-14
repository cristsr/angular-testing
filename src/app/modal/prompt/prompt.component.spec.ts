import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptComponent } from './prompt.component';

describe('PromptComponent', () => {
  let component: PromptComponent;
  let fixture: ComponentFixture<PromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptComponent);
    component = fixture.componentInstance;
    component.config = {
      title: 'title',
      subtitle: 'subtitle',
      type: 'success'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate configuration', () => {
    const titleEl = fixture.debugElement.nativeElement.querySelector('#title');
    const subtitleEl = fixture.debugElement.nativeElement.querySelector('#subtitle');
    expect(titleEl.innerText).toEqual('title');
    expect(subtitleEl.innerText).toEqual('subtitle');
  });

  it('call onDecline', () => {
    component.action.subscribe((action: any) => {
      expect(action).toEqual({
        destroy: true,
        data: {
          confirm: false
        }
      });
    });

    component.onDecline();
  });

  it('call onAccept', () => {
    component.action.subscribe((action: any) => {
      expect(action).toEqual({
        destroy: true,
        data: {
          confirm: true
        }
      });
    });

    component.onAccept();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
    TestBed.resetTestingModule();
  });
});
