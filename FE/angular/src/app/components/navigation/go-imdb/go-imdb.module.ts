import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GoImdbComponent } from "./go-imdb.component";

@NgModule({
    declarations: [
        GoImdbComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GoImdbComponent
    ]
})
export class GoImdbModule { }