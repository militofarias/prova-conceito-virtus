package com.virtus.blog.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.stream.Stream;

import com.virtus.blog.service.dto.AssetDTO;
import com.virtus.blog.service.dto.UploadFileResponse;
import com.virtus.blog.storage.FileStorageException;
import com.virtus.blog.storage.FileStorageProperties;
import com.virtus.blog.storage.StorageFileNotFoundException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class FileSystemStorageService implements FileStorageService {

    private final Path rootLocation;

    private final AssetService assetService;

    @Autowired
    public FileSystemStorageService(FileStorageProperties properties, AssetService assetService) {
        this.rootLocation = Paths.get(properties.getUploadDir());
        this.assetService = assetService;
    }

    @Override
    public UploadFileResponse store(MultipartFile file) {
        String fileName = StringUtils.cleanPath(getDateTime() + "." + FilenameUtils.getExtension(file.getOriginalFilename()));
        try {
            if (file.isEmpty()) {
                throw new FileStorageException("Failed to store empty file " + fileName);
            }
            if (fileName.contains("..")) {
                // This is a security check
                throw new FileStorageException(
                        "Cannot store file with relative path outside current directory "
                                + fileName);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/asset/")
                    .path(fileName)
                    .toUriString();

                AssetDTO assetDTO = assetService.save(fileDownloadUri, file.getContentType());

                UploadFileResponse fileResponse = new UploadFileResponse(assetDTO.getId(), fileName, fileDownloadUri,
                    file.getContentType(), file.getSize());

                return fileResponse;
            }
        }
        catch (IOException e) {
            throw new FileStorageException("Failed to store file " + fileName, e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                .filter(path -> !path.equals(this.rootLocation))
                .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new FileStorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new FileStorageException("Could not initialize storage", e);
        }
    }

    private  final static String getDateTime()
    {
        DateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
        df.setTimeZone(TimeZone.getTimeZone("GMT")); // mention your timezone
        return df.format(new Date());
    }
}
