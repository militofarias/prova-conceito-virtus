import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Asset} from './asset.model';

export type EntityResponseType = HttpResponse<Asset>;

@Injectable()
export class AssetService {

    private resourceUrl =  SERVER_API_URL + 'api/assets';

    constructor(private http: HttpClient) { }

    create(file: File): Observable<EntityResponseType> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<Asset>(this.resourceUrl, formData, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Asset>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Asset = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Asset.
     */
    private convertItemFromServer(asset: Asset): Asset {
        return Object.assign({}, asset);
    }

    /**
     * Convert a Asset to a JSON which can be sent to the server.
     */
    private convert(asset: File): File {
        return Object.assign({}, asset);
    }
}
