package com.virtus.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.virtus.blog.domain.Asset;

import com.virtus.blog.repository.AssetRepository;
import com.virtus.blog.repository.search.AssetSearchRepository;
import com.virtus.blog.service.FileStorageService;
import com.virtus.blog.web.rest.errors.BadRequestAlertException;
import com.virtus.blog.web.rest.util.HeaderUtil;
import com.virtus.blog.service.dto.AssetDTO;
import com.virtus.blog.service.mapper.AssetMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Asset.
 */
@RestController
@RequestMapping("/api")
public class AssetResource {

    private final Logger log = LoggerFactory.getLogger(AssetResource.class);

    private static final String ENTITY_NAME = "asset";

    private final AssetRepository assetRepository;

    private final AssetMapper assetMapper;

    private final AssetSearchRepository assetSearchRepository;

    private FileStorageService fileStorageService;

    public AssetResource(AssetRepository assetRepository,
                         AssetMapper assetMapper,
                         AssetSearchRepository assetSearchRepository,
                         FileStorageService fileStorageService) {
        this.assetRepository = assetRepository;
        this.assetMapper = assetMapper;
        this.assetSearchRepository = assetSearchRepository;
        this.fileStorageService = fileStorageService;

    }

    /**
     * POST  /assets : Create a new asset.
     *
     * @param file the file to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assetDTO, or with status 400 (Bad Request) if the asset has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assets")
    @Timed
    public ResponseEntity<AssetDTO> createAsset(@RequestParam("file") MultipartFile file) throws URISyntaxException {
        log.debug("REST request to save Asset : {}");

        String fileName = fileStorageService.storeFile(file);

        Asset asset = new Asset();
        asset.setFileType(file.getContentType());
        asset.setFileName(fileName);
        asset = assetRepository.save(asset);
        AssetDTO result = assetMapper.toDto(asset);
        result.setImagePath(ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/assets/file/")
            .path(Long.toString(asset.getId()))
            .toUriString());

        assetSearchRepository.save(asset);
        return ResponseEntity.created(new URI("/api/assets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assets/:id : get the "id" asset.
     *
     * @param id the id of the assetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/assets/{id}")
    @Timed
    public ResponseEntity<AssetDTO> getAsset(@PathVariable Long id) {
        log.debug("REST request to get Asset : {}", id);
        Asset asset = assetRepository.findOne(id);
        AssetDTO assetDTO = assetMapper.toDto(asset);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(assetDTO));
    }

    @GetMapping("/assets/file/{id}")
    @Timed
    public ResponseEntity<Resource> getAssetFile(@PathVariable Long id, HttpServletRequest request) {
        log.debug("REST request to get Asset : {}", id);
        Asset asset = assetRepository.findOne(id);

        Resource resource = fileStorageService.loadFileAsResource(asset.getFileName());

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
    }

    /**
     * DELETE  /assets/:id : delete the "id" asset.
     *
     * @param id the id of the assetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assets/{id}")
    @Timed
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        log.debug("REST request to delete Asset : {}", id);
        assetRepository.delete(id);
        assetSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
