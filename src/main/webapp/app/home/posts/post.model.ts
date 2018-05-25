import { BaseEntity } from '../../shared/index';

export class Post implements BaseEntity {
    public id?: number;
    public title?: string;
    public bodyText?: string;
    public date?: Date;
    public assets?: string[];
    public authorLogin?: string;
    public commentaries: any[]