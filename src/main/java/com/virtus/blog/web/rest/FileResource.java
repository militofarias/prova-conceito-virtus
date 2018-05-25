package com.virtus.blog.web.rest;


import com.virtus.blog.domain.Asset;
import com.virtus.blog.repository.AssetRepository;
import com.virtus.blog.service.FileStorageService;
import com.virtus.blog.service.dto.AssetDTO;
import com.virtus.blog.service.dto.UploadFileDTO;
import com.virtus.blog.service.mapper.AssetMapper;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.core.io.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import org.slf4j.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class FileResource {
    private static final Logger logger = LoggerFactory.getLogger(FileResource.class);

    private FileStorageService fileStorageService;

    private AssetRepository assetRepository;
    private final AssetMapper assetMapper;

    public FileResource(FileStorageService fileStorageService, AssetRepository assetRepository, AssetMapper assetMapper) {
        this.fileStorageService = fileStorageService;
        this.assetRepository = assetRepository;
        this.assetMapper = assetMapper;
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<AssetDTO> uploadFile(@RequestParam("file") MultipartFile file) throws URISyntaxException {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/downloadFile/")
            .path(fileName)
            .toUriString();

        Asset asset = new Asset();
        asset.setImagePath(fileDownloadUri);
        asset = this.assetRepository.save(asset);
        AssetDTO result = assetMapper.toDto(asset);
        result.setFileType(file.getContentType());

        System.out.println(file.getContentType());
        System.out.println("sdasdasoidsaiodaonsiodn");


        return ResponseEntity.created(new URI("/api/assets/" + asset.getId()))
            .body(result);
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
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
}
