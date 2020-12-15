import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MatIconRegisterService {

    private readonly icons = [
        'history'
    ];

    constructor(private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer) { }

    registerIcons(): void {
        this.icons
            .forEach((icon: string) => {
                this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`));
            });
    }
}
