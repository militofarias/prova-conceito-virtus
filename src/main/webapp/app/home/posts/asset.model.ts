import { BaseEntity } from '../../shared';

export class Asset implements BaseEntity {
    constructor(
        public id?: number,
        public path?: string,
        public fileType?: string
    ) {
    }
}
