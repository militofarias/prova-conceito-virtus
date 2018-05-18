package com.virtus.blog.repository.search;

import com.virtus.blog.domain.Commentary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Commentary entity.
 */
public interface CommentarySearchRepository extends ElasticsearchRepository<Commentary, Long> {
}
