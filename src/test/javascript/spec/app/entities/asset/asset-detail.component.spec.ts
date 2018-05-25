/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHipsterBlogTestModule } from '../../../test.module';
import { AssetDetailComponent } from '../../../../../../main/webapp/app/entities/asset/asset-detail.component';
import { AssetService } from '../../../../../../main/webapp/app/entities/asset/asset.service';
import { Asset } from '../../../../../../main/webapp/app/entities/asset/asset.model';

describe('Component Tests', () => {

    describe('Asset Management Detail Component', () => {
        let comp: AssetDetailComponent;
        let fixture: ComponentFixture<AssetDetailComponent>;
        let service: AssetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [AssetDetailComponent],
                providers: [
                    AssetService
                ]
            })
            .overrideTemplate(AssetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Asset(123)
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
