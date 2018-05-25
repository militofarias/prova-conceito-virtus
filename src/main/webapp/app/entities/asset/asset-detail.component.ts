import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Asset } from './asset.model';
import { AssetService } from './asset.service';

@Component({
    selector: 'jhi-asset-detail',
    templateUrl: './asset-detail.component.html'
})
export class AssetDetailComponent implements OnInit, OnDestroy {

    asset: Asset;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assetService: AssetService,
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
            .subscribe((assetResponse: HttpResponse<Asset>) => {
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
