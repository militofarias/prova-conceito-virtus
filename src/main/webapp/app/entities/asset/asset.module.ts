import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../../shared';
import {
    AssetService,
    AssetPopupService,
    AssetComponent,
    AssetDetailComponent,
    AssetDialogComponent,
    AssetPopupComponent,
    AssetDeletePopupComponent,
    AssetDeleteDialogComponent,
    assetRoute,
    assetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...assetRoute,
    ...assetPopupRoute,
];

@NgModule({
    imports: [
        JHipsterBlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssetComponent,
        AssetDetailComponent,
        AssetDialogComponent,
        AssetDeleteDialogComponent,
        AssetPopupComponent,
        AssetDeletePopupComponent,
    ],
    entryComponents: [
        AssetComponent,
        AssetDialogComponent,
        AssetPopupComponent,
        AssetDeleteDialogComponent,
        AssetDeletePopupComponent,
    ],
    providers: [
        AssetService,
        AssetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogAssetModule {}
