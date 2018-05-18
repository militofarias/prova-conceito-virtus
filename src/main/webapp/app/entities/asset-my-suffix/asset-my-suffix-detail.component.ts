import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AssetMySuffix } from './asset-my-suffix.model';
import { AssetMySuffixService } from './asset-my-suffix.service';

@Component({
    selector: 'jhi-asset-my-suffix-detail',
    templateUrl: './asset-my-suffix-detail.component.html'
})
export class AssetMySuffixDetailComponent implements OnInit, OnDestroy {

    asset: AssetMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assetService: AssetMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssets();
    }

    load(id) {
        this.assetService.find(id)
            .subscribe((assetResponse: HttpResponse<AssetMySuffix>) => {
                this.asset = assetResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assetListModification',
            (response) => this.load(this.asset.id)
        );
    }
}
