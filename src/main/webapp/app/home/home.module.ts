import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {
    PostsComponent,
    postPopupRoute,
    PostsPopupComponent,
    PostsPopupService,
    PostsDialogComponent,
    PostService
} from './posts';

import {CommentaryService} from "./commentaries";
import {FileService} from "./files";

@NgModule({
    imports: [
        JHipsterBlogSharedModule,
        RouterModule.forChild([ HOME_ROUTE, ...postPopupRoute ])
    ],
    declarations: [
        HomeComponent,
        PostsComponent,
        PostsPopupComponent,
        PostsDialogComponent
    ],
    entryComponents: [
        PostsDialogComponent
    ],
    providers: [
        PostsPopupService,
        PostService,
        CommentaryService,
        FileService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogHomeModule {}
