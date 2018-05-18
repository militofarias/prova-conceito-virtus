import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BodyMySuffix } from './body-my-suffix.model';
import { BodyMySuffixPopupService } from './body-my-suffix-popup.service';
import { BodyMySuffixService } from './body-my-suffix.service';

@Component({
    selector: 'jhi-body-my-suffix-delete-dialog',
    templateUrl: './body-my-suffix-delete-dialog.component.html'
})
export class BodyMySuffixDeleteDialogComponent {

    body: BodyMySuffix;

    constructor(
        private bodyService: BodyMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bodyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bodyListModification',
                content: 'Deleted an body'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-body-my-suffix-delete-popup',
    template: ''
})
export class BodyMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bodyPopupService: BodyMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bodyPopupService
                .open(BodyMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
