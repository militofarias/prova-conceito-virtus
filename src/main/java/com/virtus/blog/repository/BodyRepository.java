package com.virtus.blog.repository;

import com.virtus.blog.domain.Body;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Body entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BodyRepository extends JpaRepository<Body, Long> {

}
