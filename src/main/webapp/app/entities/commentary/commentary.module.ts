import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../../shared';
import { JHipsterBlogAdminModule } from '../../admin/admin.module';
import {
    CommentaryService,
    CommentaryPopupService,
    CommentaryComponent,
    CommentaryDetailComponent,
    CommentaryDialogComponent,
    CommentaryPopupComponent,
    CommentaryDeletePopupComponent,
    CommentaryDeleteDialogComponent,
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
        CommentaryComponent,
        CommentaryDetailComponent,
        CommentaryDialogComponent,
        CommentaryDeleteDialogComponent,
        CommentaryPopupComponent,
        CommentaryDeletePopupComponent,
    ],
    entryComponents: [
        CommentaryComponent,
        CommentaryDialogComponent,
        CommentaryPopupComponent,
        CommentaryDeleteDialogComponent,
        CommentaryDeletePopupComponent,
    ],
    providers: [
        CommentaryService,
        CommentaryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogCommentaryModule {}
