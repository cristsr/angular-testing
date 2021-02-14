import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { tap } from 'rxjs/operators';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
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

  it('call close', () => {

    component.action.pipe(
      tap(action => expect(action.destroy).toBeTruthy())
    );
    component.close();
    expect(component).toBeTruthy();
  });

  it('call close', () => {
    const classHtml = component.getClass();
    expect(classHtml).toEqual({
      'is-success': true,
      'is-danger': false
    });
  });

  afterEach(() => {
    fixture.nativeElement.remove();
    TestBed.resetTestingModule();
  });
});
