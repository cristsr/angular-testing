import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private container!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }

  setContainer(container: ViewContainerRef): void {
    this.container = container;
  }

  open(component: Type<any>, config: any): Observable<any> {
    const factoryComponent = this.resolver.resolveComponentFactory(component);
    const componentRef = this.container.createComponent(factoryComponent);
    this.subscribeToDestroy(componentRef);
    componentRef.instance.config = config;

    return componentRef.instance.action.pipe(
      map((action: any) => action.data)
    );
  }

  subscribeToDestroy(componentRef: ComponentRef<any>): void {
    componentRef.instance.action.pipe(
      filter((action: any) => action.destroy),
    ).subscribe(() => componentRef.destroy());
  }
}
