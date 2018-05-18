/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipsterBlogTestModule } from '../../../test.module';
import { AssetMySuffixComponent } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix.component';
import { AssetMySuffixService } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix.service';
import { AssetMySuffix } from '../../../../../../main/webapp/app/entities/asset-my-suffix/asset-my-suffix.model';

describe('Component Tests', () => {

    describe('AssetMySuffix Management Component', () => {
        let comp: AssetMySuffixComponent;
        let fixture: ComponentFixture<AssetMySuffixComponent>;
        let service: AssetMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [AssetMySuffixComponent],
                providers: [
                    AssetMySuffixService
                ]
            })
            .overrideTemplate(AssetMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AssetMySuffix(123)],
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
