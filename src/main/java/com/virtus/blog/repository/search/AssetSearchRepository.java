package com.virtus.blog.repository.search;

import com.virtus.blog.domain.Asset;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Asset entity.
 */
public interface AssetSearchRepository extends ElasticsearchRepository<Asset, Long> {
}
