package com.virtus.blog.service;

import com.virtus.blog.domain.Asset;
import com.virtus.blog.repository.AssetRepository;
import com.virtus.blog.repository.search.AssetSearchRepository;
import com.virtus.blog.service.dto.AssetDTO;
import com.virtus.blog.service.mapper.AssetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AssetService {

    private final Logger log = LoggerFactory.getLogger(AssetService.class);

    private final AssetRepository assetRepository;

    private final AssetMapper assetMapper;

    private final AssetSearchRepository assetSearchRepository;


    public AssetService(AssetRepository assetRepository, AssetMapper assetMapper, AssetSearchRepository assetSearchRepository) {
        this.assetRepository = assetRepository;
        this.assetMapper = assetMapper;
        this.assetSearchRepository = assetSearchRepository;
    }

    public AssetDTO save(String assetPath, String assetType) {
        Asset asset = new Asset();
        asset.setImagePath(assetPath);
        asset.setImageType(assetType);

        asset = this.assetRepository.save(asset);

        return assetMapper.toDto(asset);
    }

    public Asset upDate(Asset asset) {
        asset = assetRepository.save(asset);
        assetSearchRepository.save(asset);
        return asset;
    }

}
