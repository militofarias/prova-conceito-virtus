/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHipsterBlogTestModule } from '../../../test.module';
import { AssetMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix-detail.component';
import { AssetMySuffixService } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix.service';
import { AssetMySuffix } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix.model';

describe('Component Tests', () => {

    describe('AssetMySuffix Management Detail Component', () => {
        let comp: AssetMySuffixDetailComponent;
        let fixture: ComponentFixture<AssetMySuffixDetailComponent>;
        let service: AssetMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [AssetMySuffixDetailComponent],
                providers: [
                    AssetMySuffixService
                ]
            })
            .overrideTemplate(AssetMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AssetMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.asset).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
