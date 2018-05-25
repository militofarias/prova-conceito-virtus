/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipsterBlogTestModule } from '../../../test.module';
import { AssetComponent } from '../../../../../../main/webapp/app/entities/asset/asset.component';
import { AssetService } from '../../../../../../main/webapp/app/entities/asset/asset.service';
import { Asset } from '../../../../../../main/webapp/app/entities/asset/asset.model';

describe('Component Tests', () => {

    describe('Asset Management Component', () => {
        let comp: AssetComponent;
        let fixture: ComponentFixture<AssetComponent>;
        let service: AssetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [AssetComponent],
                providers: [
                    AssetService
                ]
            })
            .overrideTemplate(AssetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Asset(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.assets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
