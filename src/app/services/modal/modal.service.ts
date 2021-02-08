import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private container!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }

  setContainer(container: ViewContainerRef): void {
    this.container = container;
  }

  openModal(component: Type<any>, config: any): Observable<any> {
    const factoryComponent = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factoryComponent);
    this.componentRef.instance.config = config;

    return this.componentRef.instance.action.pipe(
      tap((action: any) => action.destroy && this.componentRef.destroy())
    );
  }
}
