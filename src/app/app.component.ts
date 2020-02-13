import { Component, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public viewRef: ViewContainerRef,
    public resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const factoryChild = this.resolver.resolveComponentFactory(ChildComponent);
    const refChild = this.viewRef.createComponent(factoryChild);

    const node = document.createElement('div');
    node.appendChild(refChild.location.nativeElement);

    const factoryParent = this.resolver.resolveComponentFactory(ParentComponent);

    // THIS ERROR
    const refParent = this.viewRef.createComponent(factoryParent, 0, null, [[node]]);
  }
}

@Component({
  selector: 'app-parent',
  template: `
    <div><ng-content></ng-content></div>
  `
})
export class ParentComponent {}

@Component({
  selector: 'app-child',
  template: `
    <div>Child</div>
  `
})
export class ChildComponent {}
