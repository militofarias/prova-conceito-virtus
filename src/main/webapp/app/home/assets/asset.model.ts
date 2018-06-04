import { BaseEntity } from '../../shared/index';

export class Asset implements BaseEntity {
    constructor(
        public id?: number,
        public imagePath?: string,
        public fileType?: string
    ) {
    }
}
