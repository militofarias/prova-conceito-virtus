import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Asset } from './asset.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Asset>;

@Injectable()
export class AssetService {

    private resourceUrl =  SERVER_API_URL + 'api/assets';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/assets';

    constructor(private http: HttpClient) { }

    create(asset: Asset): Observable<EntityResponseType> {
        const copy = this.convert(asset);
        return this.http.post<Asset>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(asset: Asset): Observable<EntityResponseType> {
        const copy = this.convert(asset);
        return this.http.put<Asset>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Asset>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Asset[]>> {
        const options = createRequestOption(req);
        return this.http.get<Asset[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Asset[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Asset[]>> {
        const options = createRequestOption(req);
        return this.http.get<Asset[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Asset[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Asset = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Asset[]>): HttpResponse<Asset[]> {
        const jsonResponse: Asset[] = res.body;
        const body: Asset[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Asset.
     */
    private convertItemFromServer(asset: Asset): Asset {
        const copy: Asset = Object.assign({}, asset);
        return copy;
    }

    /**
     * Convert a Asset to a JSON which can be sent to the server.
     */
    private convert(asset: Asset): Asset {
        const copy: Asset = Object.assign({}, asset);
        return copy;
    }
}
