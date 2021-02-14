import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ComponentFactoryResolver,
          useValue: {
            resolveComponentFactory: () => ({}) as ComponentFactory<any>
          }
        }
      ]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call setContainer', () => {
    const viewContainerRefMock = {} as ViewContainerRef;
    service.setContainer(viewContainerRefMock);
    expect(service).toBeTruthy();
  });

  it('call open', () => {
    const viewContainerRefMock = {
      createComponent: f => ({
        instance: {
          action: of({
            destroy: true,
            data: {
              test: 'test'
            }
          })
        },
        destroy: () => {}
      }) as ComponentRef<any>
    } as ViewContainerRef;
    service.setContainer(viewContainerRefMock);

    service.open({} as any, {}).subscribe(action => {
      expect(action.test).toEqual('test');
    });
    expect(service).toBeTruthy();
  });
});
