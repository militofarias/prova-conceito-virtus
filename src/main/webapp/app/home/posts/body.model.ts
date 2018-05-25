import { BaseEntity } from '../shared/index';
import {Asset} from './asset.model';

export class Body implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public assets?: Asset[],
    ) {
    }
}
