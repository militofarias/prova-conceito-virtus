package com.virtus.blog.web.rest;

import com.virtus.blog.service.FileStorageService;

import java.io.IOException;
import java.util.stream.Collectors;

import com.virtus.blog.service.dto.UploadFileResponse;
import com.virtus.blog.storage.StorageFileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/api")
public class UploadController {

    private final FileStorageService storageService;

    @Autowired
    public UploadController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/filelist")
    public String listUploadedFiles(Model model) throws IOException {

        return model.addAttribute("files", storageService.loadAll().map(
            path -> MvcUriComponentsBuilder.fromMethodName(UploadController.class,
                "serveFile", path.getFileName().toString()).build().toString())
            .collect(Collectors.toList())).toString();
    }

    @GetMapping("/asset/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/upload")
    public UploadFileResponse handleFileUpload(@RequestParam("file") MultipartFile file,
                                                               RedirectAttributes redirectAttributes) {
        UploadFileResponse fileResponse = storageService.store(file);

        redirectAttributes.addFlashAttribute("message",
            "You successfully uploaded " + file.getOriginalFilename() + "!");

        return fileResponse;
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
