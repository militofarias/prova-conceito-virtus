import { BaseEntity } from '../../shared';
import {Asset} from './asset.model';

export class Post implements BaseEntity {
    public id?: number;
    public title?: string;
    public bodyText?: string;
    public date?: Date;
    public assets?: Asset[];
    public authorLogin?: string;
    public commentaries: any[];
}
