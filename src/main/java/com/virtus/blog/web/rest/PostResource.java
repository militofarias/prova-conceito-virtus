package com.virtus.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.virtus.blog.domain.Body;
import com.virtus.blog.repository.BodyRepository;
import com.virtus.blog.security.AuthoritiesConstants;
import com.virtus.blog.service.PostService;
import com.virtus.blog.service.dto.RequestPostDTO;
import com.virtus.blog.web.rest.util.HeaderUtil;
import com.virtus.blog.web.rest.util.PaginationUtil;
import com.virtus.blog.service.dto.PostDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Post.
 */
@RestController
@RequestMapping("/api")
public class PostResource {

    private final Logger log = LoggerFactory.getLogger(PostResource.class);

    private static final String ENTITY_NAME = "post";

    private final PostService postService;

    private final BodyRepository bodyRepository;

    public PostResource(PostService postService, BodyRepository bodyRepository) {

        this.postService = postService;
        this.bodyRepository = bodyRepository;
    }

    /**
     * POST  /posts : Create a new post.
     *
     * @param requestPostDTO the postDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new postDTO, or with status 400 (Bad Request) if the post has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/posts")
    @Timed
    @Secured({AuthoritiesConstants.AUTHOR, AuthoritiesConstants.ADMIN})
    public ResponseEntity<PostDTO> createPost(@Valid @RequestBody RequestPostDTO requestPostDTO) throws URISyntaxException {
        log.debug("REST request to save Post : {}", requestPostDTO);

        PostDTO result = this.postService.createPost(requestPostDTO);

        return ResponseEntity.created(new URI("/api/posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /posts : Updates an existing post.
     *
     * @param postDTO the postDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated postDTO,
     * or with status 400 (Bad Request) if the postDTO is not valid,
     * or with status 500 (Internal Server Error) if the postDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/posts")
    @Timed
    public ResponseEntity<PostDTO> updatePost(@Valid @RequestBody PostDTO postDTO) throws URISyntaxException {
        log.debug("REST request to update Post : {}", postDTO);
//        if (postDTO.getId() == null) {
//            return createPost(postDTO); Veririfcar se deve ficar
//        }
        PostDTO result = postService.updatePost(postDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, postDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /posts : get all the posts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of posts in body
     */
    @GetMapping("/posts")
    @Timed
    public ResponseEntity<List<PostDTO>> getAllPosts(Pageable pageable) {
        log.debug("REST request to get a page of Posts");
        Page<PostDTO> page = postService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/posts");
        return new ResponseEntity<>(postService.getPostDTOFormat(page), headers, HttpStatus.OK);
    }


    /**
     * GET  /posts/:id : get the "id" post.
     *
     * @param id the id of the postDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the postDTO, or with status 404 (Not Found)
     */
    @GetMapping("/posts/{id}")
    @Timed
    public ResponseEntity<PostDTO> getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        PostDTO postDTO = postService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(postDTO));
    }

    /**
     * DELETE  /posts/:id : delete the "id" post.
     *
     * @param id the id of the postDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/posts/{id}")
    @Timed
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        log.debug("REST request to delete Post : {}", id);
        postService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/posts?query=:query : search for the post corresponding
     * to the query.
     *
     * @param query the query of the post search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/posts")
    @Timed
    public ResponseEntity<List<PostDTO>> searchPosts(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Posts for query {}", query);
        Page<PostDTO> page = postService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/posts");
        return new ResponseEntity<>(postService.getPostDTOFormat(page), headers, HttpStatus.OK);
    }

}
