import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[ifCategorieVeh]'
})

export class ifCategorieVeh implements OnInit {
    @Input() categorie;
    renderer: Renderer2;
    elmRef: ElementRef;
    constructor(renderer: Renderer2, elmRef: ElementRef) {
        this.renderer = renderer;
        this.elmRef = elmRef;
    }

    ngOnInit() {
        if (this.categorie === 'VEH') {
            this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'block');
        } else {
            this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'none');
        }
    }
}