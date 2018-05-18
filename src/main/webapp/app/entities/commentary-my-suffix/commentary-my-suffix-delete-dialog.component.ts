import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentaryMySuffix } from './commentary-my-suffix.model';
import { CommentaryMySuffixPopupService } from './commentary-my-suffix-popup.service';
import { CommentaryMySuffixService } from './commentary-my-suffix.service';

@Component({
    selector: 'jhi-commentary-my-suffix-delete-dialog',
    templateUrl: './commentary-my-suffix-delete-dialog.component.html'
})
export class CommentaryMySuffixDeleteDialogComponent {

    commentary: CommentaryMySuffix;

    constructor(
        private commentaryService: CommentaryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentaryListModification',
                content: 'Deleted an commentary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commentary-my-suffix-delete-popup',
    template: ''
})
export class CommentaryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentaryPopupService: CommentaryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentaryPopupService
                .open(CommentaryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
