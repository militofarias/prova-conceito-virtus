import { BaseEntity } from './../../shared';

export class AssetMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public imagePath?: string,
        public bodyId?: number,
    ) {
    }
}
