import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GoBackComponent } from "./go-back.component";
import { SidebarModule } from "../../sidebar/sidebar.module";

@NgModule({
    declarations: [
        GoBackComponent
    ],
    imports: [
        CommonModule,
        SidebarModule
    ],
    exports: [
        GoBackComponent
    ]
})
export class GoBackModule { }