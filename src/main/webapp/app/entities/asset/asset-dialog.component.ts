import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Asset } from './asset.model';
import { AssetPopupService } from './asset-popup.service';
import { AssetService } from './asset.service';
import { Post, PostService } from '../post';

@Component({
    selector: 'jhi-asset-dialog',
    templateUrl: './asset-dialog.component.html'
})
export class AssetDialogComponent implements OnInit {

    asset: Asset;
    isSaving: boolean;

    posts: Post[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assetService: AssetService,
        private postService: PostService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.postService.query()
            .subscribe((res: HttpResponse<Post[]>) => { this.posts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.asset.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assetService.update(this.asset));
        } else {
            this.subscribeToSaveResponse(
                this.assetService.create(this.asset));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Asset>>) {
        result.subscribe((res: HttpResponse<Asset>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Asset) {
        this.eventManager.broadcast({ name: 'assetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPostById(index: number, item: Post) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-asset-popup',
    template: ''
})
export class AssetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetPopupService: AssetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assetPopupService
                    .open(AssetDialogComponent as Component, params['id']);
            } else {
                this.assetPopupService
                    .open(AssetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
