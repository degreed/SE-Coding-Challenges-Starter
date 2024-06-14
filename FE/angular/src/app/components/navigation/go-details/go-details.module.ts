import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GoDetailsComponent } from "./go-details.component";

@NgModule({
    declarations: [
        GoDetailsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GoDetailsComponent
    ]
})
export class GoDetailsModule { }