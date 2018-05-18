import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../../shared';
import {
    BodyMySuffixService,
    BodyMySuffixPopupService,
    BodyMySuffixComponent,
    BodyMySuffixDetailComponent,
    BodyMySuffixDialogComponent,
    BodyMySuffixPopupComponent,
    BodyMySuffixDeletePopupComponent,
    BodyMySuffixDeleteDialogComponent,
    bodyRoute,
    bodyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bodyRoute,
    ...bodyPopupRoute,
];

@NgModule({
    imports: [
        JHipsterBlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BodyMySuffixComponent,
        BodyMySuffixDetailComponent,
        BodyMySuffixDialogComponent,
        BodyMySuffixDeleteDialogComponent,
        BodyMySuffixPopupComponent,
        BodyMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BodyMySuffixComponent,
        BodyMySuffixDialogComponent,
        BodyMySuffixPopupComponent,
        BodyMySuffixDeleteDialogComponent,
        BodyMySuffixDeletePopupComponent,
    ],
    providers: [
        BodyMySuffixService,
        BodyMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogBodyMySuffixModule {}
