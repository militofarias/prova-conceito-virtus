import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../../shared';
import { JHipsterBlogAdminModule } from '../../admin/admin.module';
import {
    PostMySuffixService,
    PostMySuffixPopupService,
    PostMySuffixComponent,
    PostMySuffixDetailComponent,
    PostMySuffixDialogComponent,
    PostMySuffixPopupComponent,
    PostMySuffixDeletePopupComponent,
    PostMySuffixDeleteDialogComponent,
    postRoute,
    postPopupRoute,
} from './';

const ENTITY_STATES = [
    ...postRoute,
    ...postPopupRoute,
];

@NgModule({
    imports: [
        JHipsterBlogSharedModule,
        JHipsterBlogAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PostMySuffixComponent,
        PostMySuffixDetailComponent,
        PostMySuffixDialogComponent,
        PostMySuffixDeleteDialogComponent,
        PostMySuffixPopupComponent,
        PostMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PostMySuffixComponent,
        PostMySuffixDialogComponent,
        PostMySuffixPopupComponent,
        PostMySuffixDeleteDialogComponent,
        PostMySuffixDeletePopupComponent,
    ],
    providers: [
        PostMySuffixService,
        PostMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogPostMySuffixModule {}
