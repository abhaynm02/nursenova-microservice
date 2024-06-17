package com.abhay.nurse_service.filestore;

import com.abhay.nurse_service.bucket.BucketName;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;
import java.util.Optional;
@Component
public class FileStore {
    private final AmazonS3 s3;

    public FileStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void save(String path,
                     String fileName,
                     MultipartFile inputStream) throws IOException {

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(inputStream.getContentType());
        PutObjectRequest putObjectRequest = new PutObjectRequest(path, fileName, inputStream.getInputStream(), metadata);

        try {
            s3.putObject(putObjectRequest);
        }catch (AmazonServiceException e){
            throw new IllegalStateException("failed to store file to s3",e);
        }
    }

    public byte[] download(String path, String  key) {
        try {
         S3Object object= s3.getObject(path,key);
            S3ObjectInputStream inputStream =object.getObjectContent();
            return IOUtils.toByteArray(inputStream);
        }catch (AmazonServiceException e){
            throw new IllegalStateException("failed to download file to s3 ",e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateUrl(String key ){
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime() + (60 * 60 * 1000); // 1 hour
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(BucketName.PROFILE_IMAGE.getBucketName(), key)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);

        URL url = s3.generatePresignedUrl(generatePresignedUrlRequest);
        return  url.toString();
    }
}
