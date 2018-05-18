/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JHipsterBlogTestModule } from '../../../test.module';
import { AssetMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix-delete-dialog.component';
import { AssetMySuffixService } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix.service';

describe('Component Tests', () => {

    describe('AssetMySuffix Management Delete Component', () => {
        let comp: AssetMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AssetMySuffixDeleteDialogComponent>;
        let service: AssetMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [AssetMySuffixDeleteDialogComponent],
                providers: [
                    AssetMySuffixService
                ]
            })
            .overrideTemplate(AssetMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
