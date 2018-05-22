import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {
    PostsComponent,
    postPopupRoute,
    PostsPopupComponent,
    PostsPopupService,
    PostsDialogComponent
} from './posts';

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
        PostsPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogHomeModule {}
