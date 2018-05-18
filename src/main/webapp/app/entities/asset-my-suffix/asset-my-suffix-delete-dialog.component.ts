import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AssetMySuffix } from './asset-my-suffix.model';
import { AssetMySuffixPopupService } from './asset-my-suffix-popup.service';
import { AssetMySuffixService } from './asset-my-suffix.service';

@Component({
    selector: 'jhi-asset-my-suffix-delete-dialog',
    templateUrl: './asset-my-suffix-delete-dialog.component.html'
})
export class AssetMySuffixDeleteDialogComponent {

    asset: AssetMySuffix;

    constructor(
        private assetService: AssetMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assetListModification',
                content: 'Deleted an asset'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-asset-my-suffix-delete-popup',
    template: ''
})
export class AssetMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetPopupService: AssetMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assetPopupService
                .open(AssetMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
