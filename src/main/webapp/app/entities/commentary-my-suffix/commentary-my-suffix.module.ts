import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../../shared';
import { JHipsterBlogAdminModule } from '../../admin/admin.module';
import {
    CommentaryMySuffixService,
    CommentaryMySuffixPopupService,
    CommentaryMySuffixComponent,
    CommentaryMySuffixDetailComponent,
    CommentaryMySuffixDialogComponent,
    CommentaryMySuffixPopupComponent,
    CommentaryMySuffixDeletePopupComponent,
    CommentaryMySuffixDeleteDialogComponent,
    commentaryRoute,
    commentaryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentaryRoute,
    ...commentaryPopupRoute,
];

@NgModule({
    imports: [
        JHipsterBlogSharedModule,
        JHipsterBlogAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommentaryMySuffixComponent,
        CommentaryMySuffixDetailComponent,
        CommentaryMySuffixDialogComponent,
        CommentaryMySuffixDeleteDialogComponent,
        CommentaryMySuffixPopupComponent,
        CommentaryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CommentaryMySuffixComponent,
        CommentaryMySuffixDialogComponent,
        CommentaryMySuffixPopupComponent,
        CommentaryMySuffixDeleteDialogComponent,
        CommentaryMySuffixDeletePopupComponent,
    ],
    providers: [
        CommentaryMySuffixService,
        CommentaryMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogCommentaryMySuffixModule {}
