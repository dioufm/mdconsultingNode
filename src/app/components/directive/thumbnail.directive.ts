import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: 'img[thumbnail]'
})
export class ThumbnailDirective {

    @Input() public image: any;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    public ngOnChanges(changes: SimpleChanges) {

        let reader = new FileReader();
        let el = this.el;

        reader.onloadend = (readerEvent) => {
            let image = new Image();
            image.onload = (imageEvent) => {
                // Resize the image
                let canvas = document.createElement('canvas');
                let maxSizeWidth = 220;
                let maxSizeHeight = 120;
                let width = image.width;
                let height = image.height;
                if (width > height) {
                    if (width > maxSizeWidth) {
                        height *= maxSizeWidth / width;
                        width = maxSizeWidth;
                    }
                } else {
                    if (height > maxSizeHeight) {
                        width *= maxSizeHeight / height;
                        height = maxSizeHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                el.nativeElement.src = canvas.toDataURL('image/jpeg');
            };
            //image.src = reader.result;
            image.src = reader.result as string;
        };

        if (this.image) {
            return reader.readAsDataURL(this.image);
        }

    }

}