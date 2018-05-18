import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterBlogSharedModule } from '../../shared';
import {
    AssetMySuffixService,
    AssetMySuffixPopupService,
    AssetMySuffixComponent,
    AssetMySuffixDetailComponent,
    AssetMySuffixDialogComponent,
    AssetMySuffixPopupComponent,
    AssetMySuffixDeletePopupComponent,
    AssetMySuffixDeleteDialogComponent,
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
        AssetMySuffixComponent,
        AssetMySuffixDetailComponent,
        AssetMySuffixDialogComponent,
        AssetMySuffixDeleteDialogComponent,
        AssetMySuffixPopupComponent,
        AssetMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AssetMySuffixComponent,
        AssetMySuffixDialogComponent,
        AssetMySuffixPopupComponent,
        AssetMySuffixDeleteDialogComponent,
        AssetMySuffixDeletePopupComponent,
    ],
    providers: [
        AssetMySuffixService,
        AssetMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterBlogAssetMySuffixModule {}
