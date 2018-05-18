import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssetMySuffix } from './asset-my-suffix.model';
import { AssetMySuffixPopupService } from './asset-my-suffix-popup.service';
import { AssetMySuffixService } from './asset-my-suffix.service';
import { BodyMySuffix, BodyMySuffixService } from '../body-my-suffix';

@Component({
    selector: 'jhi-asset-my-suffix-dialog',
    templateUrl: './asset-my-suffix-dialog.component.html'
})
export class AssetMySuffixDialogComponent implements OnInit {

    asset: AssetMySuffix;
    isSaving: boolean;

    bodies: BodyMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assetService: AssetMySuffixService,
        private bodyService: BodyMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bodyService.query()
            .subscribe((res: HttpResponse<BodyMySuffix[]>) => { this.bodies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<AssetMySuffix>>) {
        result.subscribe((res: HttpResponse<AssetMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AssetMySuffix) {
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

    trackBodyById(index: number, item: BodyMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-asset-my-suffix-popup',
    template: ''
})
export class AssetMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetPopupService: AssetMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assetPopupService
                    .open(AssetMySuffixDialogComponent as Component, params['id']);
            } else {
                this.assetPopupService
                    .open(AssetMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
