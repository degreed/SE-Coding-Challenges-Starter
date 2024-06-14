import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DecadesComponent } from "./decades.component";
import { SidebarModule } from "../../sidebar/sidebar.module";

@NgModule({
    declarations: [
        DecadesComponent
    ],
    imports: [
        CommonModule,
        SidebarModule
    ],
    exports: [
        DecadesComponent
    ]
})
export class DecadesModule { }