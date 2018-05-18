import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssetMySuffix } from './asset-my-suffix.model';
import { AssetMySuffixService } from './asset-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-asset-my-suffix',
    templateUrl: './asset-my-suffix.component.html'
})
export class AssetMySuffixComponent implements OnInit, OnDestroy {
assets: AssetMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private assetService: AssetMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.assetService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<AssetMySuffix[]>) => this.assets = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.assetService.query().subscribe(
            (res: HttpResponse<AssetMySuffix[]>) => {
                this.assets = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAssets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AssetMySuffix) {
        return item.id;
    }
    registerChangeInAssets() {
        this.eventSubscriber = this.eventManager.subscribe('assetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
