import {BaseEntity} from "../../shared";

export class Commentary implements BaseEntity {
    public id?: number;
    public text?: any;
    public userId?: number;
    public postId?: number;
}
