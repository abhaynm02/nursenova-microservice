package com.abhay.nurse_service.bucket;

public enum BucketName {
    PROFILE_IMAGE("nursenova-images");

    private final String bucketName;
    BucketName(String s) {
        this.bucketName=s;
    }
    public String getBucketName(){
        return bucketName;
    }
}
