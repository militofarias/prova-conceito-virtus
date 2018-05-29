package com.virtus.blog.service;

import com.virtus.blog.domain.*;
import com.virtus.blog.repository.*;
import com.virtus.blog.repository.search.PostSearchRepository;
import com.virtus.blog.service.dto.CommentaryDTO;
import com.virtus.blog.service.dto.PostDTO;
import com.virtus.blog.service.dto.RequestPostDTO;
import com.virtus.blog.service.mapper.CommentaryMapper;
import com.virtus.blog.service.mapper.PostMapper;
import com.virtus.blog.web.rest.errors.PostNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.ZonedDateTime;
import java.util.*;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Post.
 */
@Service
@Transactional
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    private final AssetRepository assetRepository;

    private final BodyRepository bodyRepository;

    private final PostMapper postMapper;

    private final UserRepository userRepository;

    private final UserService userService;

    private final CommentaryRepository commentaryRepository;

    private final PostSearchRepository postSearchRepository;

    public PostService(PostRepository postRepository, PostMapper postMapper, PostSearchRepository postSearchRepository,
                       AssetRepository assetRepository, BodyRepository bodyRepository,
                       UserService userService, CommentaryRepository commentaryRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.postSearchRepository = postSearchRepository;
        this.assetRepository = assetRepository;
        this.bodyRepository = bodyRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.commentaryRepository = commentaryRepository;
    }

    /**
     * Save a post.
     *
     * @param postDTO the entity to save
     * @return the persisted entity
     */
    public PostDTO save(PostDTO postDTO) {
        log.debug("Request to save Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        PostDTO result = postMapper.toDto(post);
        postSearchRepository.save(post);
        return result;
    }

    /**
     * Get all the posts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PostDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Posts");
        return postRepository.findAll(pageable)
            .map(postMapper::toDto);
    }

    /**
     * Get one post by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PostDTO findOne(Long id) {
        log.debug("Request to get Post : {}", id);
        Post post = postRepository.findOne(id);
        return postMapper.toDto(post);
    }

    /**
     * Delete the post by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Post : {}", id);
        postRepository.delete(id);
        postSearchRepository.delete(id);
    }

    /**
     * Search for the post corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PostDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Posts for query {}", query);
        Page<Post> result = postSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(postMapper::toDto);
    }

    /**
     * Update all information for a specific post, and return the modified post.
     *
     * @param postDTO user to update
     * @return updated post
     * @throws PostNotFoundException 400 (Bad Request) if the post id is not found
     */
    public PostDTO updatePost(PostDTO postDTO) {

        Post optionalPostDTO = postRepository
            .findOne(postDTO.getId());

        if (optionalPostDTO == null) {
            throw new PostNotFoundException();
        }

        return this.save(postDTO);
    }

    /**
     * Create a post.
     *
     * @param requestPostDTO the entity to create
     * @return the persisted entity
     */
    public PostDTO createPost(RequestPostDTO requestPostDTO) {

        PostDTO postDTO = new PostDTO();
        postDTO.setTitle(requestPostDTO.getTitle());
        postDTO.setDate(ZonedDateTime.now());
        postDTO = this.save(postDTO);
        Body body = (this.createBody(requestPostDTO, postDTO));
        postDTO.setBodyId(body.getId());

        Optional<User> optionalUser = userService.getUserWithAuthorities();

        if (optionalUser.isPresent()) {
            postDTO.setAuthorId(optionalUser.get().getId());
            postDTO.setAuthorLogin(optionalUser.get().getLogin());
        }

        return this.updatePost(postDTO);
    }

    /**
     * Create a body.
     *
     * @param requestPostDTO the request data to create Post
     * @param postDTO        the post being generated
     * @return the created body
     */
    private Body createBody(RequestPostDTO requestPostDTO, PostDTO postDTO) {

        Body body = new Body();
        body.setText(requestPostDTO.getBodyText());
        body.setPost(postMapper.toEntity(postDTO));
        bodyRepository.save(body);
        body.setAssets(this.createAsset(requestPostDTO, body));

        return body;
    }

    /**
     * Create a assets list.
     *
     * @param requestPostDTO the request data to create Post
     * @param body           the body being generated
     * @return the assets list
     */
    private Set<Asset> createAsset(RequestPostDTO requestPostDTO, Body body) {

        Set<Asset> assets = new HashSet<>();
        requestPostDTO.getAssets().forEach(assetDTO -> {
            Asset asset = new Asset();
            asset.setImagePath(assetDTO.getImagePath());
            asset.body(body);
            assets.add(this.assetRepository.save(asset));
        });

        return assets;
    }


    /**
     * Get all assets from sent body
     *
     * @param page the postDTO page
     * @return the postDTO list
     */
    public List<PostDTO> getPostDTOFormat(Page<PostDTO> page) {

        List<PostDTO> pagesToReturn = new ArrayList<>();
        for (PostDTO post : page.getContent()) {
            PostDTO postDTO = new PostDTO();
            Body body = bodyRepository.findOne(post.getBodyId());
            postDTO.setBodyText(body.getText());
            postDTO.setAssets(this.getAssets(body.getId()));
            postDTO.setTitle(post.getTitle());
            postDTO.setDate(post.getDate());
            postDTO.setBodyId(post.getBodyId());
            postDTO.setId(post.getId());
            postDTO.setAuthorLogin(post.getAuthorLogin());
            postDTO.setCommentaries(getCommentaryDTOFormat(commentaryRepository.findByPostId(post.getId())));
            pagesToReturn.add(postDTO);
        }
        return pagesToReturn;
    }

    /**
     * Get all assets from sent body
     *
     * @param bodyId the body id with assets
     * @return the assets list
     */
    private List<String> getAssets(Long bodyId) {

        Body body = bodyRepository.findOne(bodyId);
        List<String> listToReturn = new ArrayList<>();

        for (Asset asset : body.getAssets()) {
            listToReturn.add(asset.getImagePath());
        }
        return listToReturn;
    }

    private List<CommentaryDTO> getCommentaryDTOFormat(List<Commentary> commentaries) {
        List<CommentaryDTO> result = new ArrayList<>();

        commentaries.forEach(commentary -> {
            CommentaryDTO commentaryDTO = new CommentaryDTO();
            commentaryDTO.setId(commentary.getId());
            commentaryDTO.setPostId(commentary.getPost().getId());
            commentaryDTO.setAuthorId(commentary.getAuthor().getId());
            commentaryDTO.setAuthorLogin(commentary.getAuthor().getLogin());
            commentaryDTO.setText(commentary.getText());
            result.add(commentaryDTO);
        });

        return result;
    }
}
