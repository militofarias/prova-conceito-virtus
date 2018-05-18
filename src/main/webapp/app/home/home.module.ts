import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {PostsComponent} from './posts';

@NgModule({
    imports: [
        JHipsterBlogSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        PostsComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogHomeModule {}
