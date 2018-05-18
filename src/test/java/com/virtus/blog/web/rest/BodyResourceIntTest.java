package com.virtus.blog.web.rest;

import com.virtus.blog.JHipsterBlogApp;

import com.virtus.blog.domain.Body;
import com.virtus.blog.repository.BodyRepository;
import com.virtus.blog.repository.search.BodySearchRepository;
import com.virtus.blog.service.dto.BodyDTO;
import com.virtus.blog.service.mapper.BodyMapper;
import com.virtus.blog.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.virtus.blog.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BodyResource REST controller.
 *
 * @see BodyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JHipsterBlogApp.class)
public class BodyResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private BodyRepository bodyRepository;

    @Autowired
    private BodyMapper bodyMapper;

    @Autowired
    private BodySearchRepository bodySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBodyMockMvc;

    private Body body;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BodyResource bodyResource = new BodyResource(bodyRepository, bodyMapper, bodySearchRepository);
        this.restBodyMockMvc = MockMvcBuilders.standaloneSetup(bodyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Body createEntity(EntityManager em) {
        Body body = new Body()
            .text(DEFAULT_TEXT);
        return body;
    }

    @Before
    public void initTest() {
        bodySearchRepository.deleteAll();
        body = createEntity(em);
    }

    @Test
    @Transactional
    public void createBody() throws Exception {
        int databaseSizeBeforeCreate = bodyRepository.findAll().size();

        // Create the Body
        BodyDTO bodyDTO = bodyMapper.toDto(body);
        restBodyMockMvc.perform(post("/api/bodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyDTO)))
            .andExpect(status().isCreated());

        // Validate the Body in the database
        List<Body> bodyList = bodyRepository.findAll();
        assertThat(bodyList).hasSize(databaseSizeBeforeCreate + 1);
        Body testBody = bodyList.get(bodyList.size() - 1);
        assertThat(testBody.getText()).isEqualTo(DEFAULT_TEXT);

        // Validate the Body in Elasticsearch
        Body bodyEs = bodySearchRepository.findOne(testBody.getId());
        assertThat(bodyEs).isEqualToIgnoringGivenFields(testBody);
    }

    @Test
    @Transactional
    public void createBodyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bodyRepository.findAll().size();

        // Create the Body with an existing ID
        body.setId(1L);
        BodyDTO bodyDTO = bodyMapper.toDto(body);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBodyMockMvc.perform(post("/api/bodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Body in the database
        List<Body> bodyList = bodyRepository.findAll();
        assertThat(bodyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBodies() throws Exception {
        // Initialize the database
        bodyRepository.saveAndFlush(body);

        // Get all the bodyList
        restBodyMockMvc.perform(get("/api/bodies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(body.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getBody() throws Exception {
        // Initialize the database
        bodyRepository.saveAndFlush(body);

        // Get the body
        restBodyMockMvc.perform(get("/api/bodies/{id}", body.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(body.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBody() throws Exception {
        // Get the body
        restBodyMockMvc.perform(get("/api/bodies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBody() throws Exception {
        // Initialize the database
        bodyRepository.saveAndFlush(body);
        bodySearchRepository.save(body);
        int databaseSizeBeforeUpdate = bodyRepository.findAll().size();

        // Update the body
        Body updatedBody = bodyRepository.findOne(body.getId());
        // Disconnect from session so that the updates on updatedBody are not directly saved in db
        em.detach(updatedBody);
        updatedBody
            .text(UPDATED_TEXT);
        BodyDTO bodyDTO = bodyMapper.toDto(updatedBody);

        restBodyMockMvc.perform(put("/api/bodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyDTO)))
            .andExpect(status().isOk());

        // Validate the Body in the database
        List<Body> bodyList = bodyRepository.findAll();
        assertThat(bodyList).hasSize(databaseSizeBeforeUpdate);
        Body testBody = bodyList.get(bodyList.size() - 1);
        assertThat(testBody.getText()).isEqualTo(UPDATED_TEXT);

        // Validate the Body in Elasticsearch
        Body bodyEs = bodySearchRepository.findOne(testBody.getId());
        assertThat(bodyEs).isEqualToIgnoringGivenFields(testBody);
    }

    @Test
    @Transactional
    public void updateNonExistingBody() throws Exception {
        int databaseSizeBeforeUpdate = bodyRepository.findAll().size();

        // Create the Body
        BodyDTO bodyDTO = bodyMapper.toDto(body);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBodyMockMvc.perform(put("/api/bodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyDTO)))
            .andExpect(status().isCreated());

        // Validate the Body in the database
        List<Body> bodyList = bodyRepository.findAll();
        assertThat(bodyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBody() throws Exception {
        // Initialize the database
        bodyRepository.saveAndFlush(body);
        bodySearchRepository.save(body);
        int databaseSizeBeforeDelete = bodyRepository.findAll().size();

        // Get the body
        restBodyMockMvc.perform(delete("/api/bodies/{id}", body.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean bodyExistsInEs = bodySearchRepository.exists(body.getId());
        assertThat(bodyExistsInEs).isFalse();

        // Validate the database is empty
        List<Body> bodyList = bodyRepository.findAll();
        assertThat(bodyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchBody() throws Exception {
        // Initialize the database
        bodyRepository.saveAndFlush(body);
        bodySearchRepository.save(body);

        // Search the body
        restBodyMockMvc.perform(get("/api/_search/bodies?query=id:" + body.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(body.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Body.class);
        Body body1 = new Body();
        body1.setId(1L);
        Body body2 = new Body();
        body2.setId(body1.getId());
        assertThat(body1).isEqualTo(body2);
        body2.setId(2L);
        assertThat(body1).isNotEqualTo(body2);
        body1.setId(null);
        assertThat(body1).isNotEqualTo(body2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BodyDTO.class);
        BodyDTO bodyDTO1 = new BodyDTO();
        bodyDTO1.setId(1L);
        BodyDTO bodyDTO2 = new BodyDTO();
        assertThat(bodyDTO1).isNotEqualTo(bodyDTO2);
        bodyDTO2.setId(bodyDTO1.getId());
        assertThat(bodyDTO1).isEqualTo(bodyDTO2);
        bodyDTO2.setId(2L);
        assertThat(bodyDTO1).isNotEqualTo(bodyDTO2);
        bodyDTO1.setId(null);
        assertThat(bodyDTO1).isNotEqualTo(bodyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bodyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bodyMapper.fromId(null)).isNull();
    }
}
