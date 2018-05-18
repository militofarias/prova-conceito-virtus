import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AssetMySuffix } from './asset-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AssetMySuffix>;

@Injectable()
export class AssetMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/assets';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/assets';

    constructor(private http: HttpClient) { }

    create(asset: AssetMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(asset);
        return this.http.post<AssetMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(asset: AssetMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(asset);
        return this.http.put<AssetMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AssetMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AssetMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssetMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssetMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AssetMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssetMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssetMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AssetMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AssetMySuffix[]>): HttpResponse<AssetMySuffix[]> {
        const jsonResponse: AssetMySuffix[] = res.body;
        const body: AssetMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AssetMySuffix.
     */
    private convertItemFromServer(asset: AssetMySuffix): AssetMySuffix {
        const copy: AssetMySuffix = Object.assign({}, asset);
        return copy;
    }

    /**
     * Convert a AssetMySuffix to a JSON which can be sent to the server.
     */
    private convert(asset: AssetMySuffix): AssetMySuffix {
        const copy: AssetMySuffix = Object.assign({}, asset);
        return copy;
    }
}
