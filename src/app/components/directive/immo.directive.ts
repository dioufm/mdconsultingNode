import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[ifCategorieImo]'
})

export class ifCategorieImo implements OnInit {
    @Input() categorie;
    renderer: Renderer2;
    elmRef: ElementRef;
    constructor(renderer: Renderer2, elmRef: ElementRef) {
        this.renderer = renderer;
        this.elmRef = elmRef;
    }

    ngOnInit() {
        if (this.categorie === 'IMO') {
            this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'block');
        } else {
            this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'none');
        }
    }
}