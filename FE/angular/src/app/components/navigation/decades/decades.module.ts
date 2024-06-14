import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DecadesComponent } from "./decades.component";

@NgModule({
    declarations: [
        DecadesComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DecadesComponent
    ]
})
export class DecadesModule { }