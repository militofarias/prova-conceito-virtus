package com.virtus.blog.repository.search;

import com.virtus.blog.domain.Body;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Body entity.
 */
public interface BodySearchRepository extends ElasticsearchRepository<Body, Long> {
}
