package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.bucket.BucketName;
import com.abhay.nurse_service.dto.LanguageDto;
import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.ProfileDto;
import com.abhay.nurse_service.exceptions.customexceptions.UsernameNotFoundException;
import com.abhay.nurse_service.filestore.FileStore;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.service.ProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class ProfileServiceImp implements ProfileService {
    private final NurseRepository nurseRepository;
    private final FileStore fileStore;

    public ProfileServiceImp(NurseRepository nurseRepository, FileStore fileStore) {
        this.nurseRepository = nurseRepository;
        this.fileStore = fileStore;
    }

    @Override
    public boolean updateProfile(ProfileDto profileDto) {
        Optional<Nurse> optional=nurseRepository.findByUserName(profileDto.getUsername());
        if (optional.isPresent()){
            Nurse nurse=optional.get();
            nurse.setFirstName(profileDto.getFirstname());
            nurse.setLastName(profileDto.getLastname());
            nurse.setPhone(profileDto.getPhone());
            nurseRepository.save(nurse);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public NurseDto findProfileDetails(String username) {
          Optional<Nurse>optional=nurseRepository.findByUserName(username);
          if (optional.isPresent()){
              Nurse nurse=optional.get();
              NurseDto nurseDto =new NurseDto();
              nurseDto.setId(nurse.getId());
              nurseDto.setFirstName(nurse.getFirstName());
              nurseDto.setLastName(nurse.getLastName());
              nurseDto.setUserName(nurse.getUserName());
              nurseDto.setAge(nurse.getAge());
              nurseDto.setGender(String.valueOf(nurse.getGender()));
              nurseDto.setAddress(nurse.getAddress());
              nurseDto.setLocation(nurse.getLocation());
              nurseDto.setEducation(nurse.getEducation());
              nurseDto.setExperience(nurse.getExperience());
              nurseDto.setVerified(nurse.isVerified());
              nurseDto.setPhone(nurse.getPhone());
              nurseDto.setProfileImageLink(fileStore.generateUrl(nurse.getProfileImageLink()));
              nurseDto.setCertificateImageLink(fileStore.generateUrl(nurse.getCertificateImageLink()));
              List<LanguageDto> languageDtos=nurse.getLanguages().stream().map(language -> {
                  LanguageDto languageDto =new LanguageDto();
                  languageDto.setId(language.getId());
                  languageDto.setLanguage(language.getLanguage());
                  return languageDto;
              }).toList();
              nurseDto.setLanguages(languageDtos);
              return nurseDto;
          }else {
              throw new UsernameNotFoundException("profile not found with given username");
          }

    }

    @Override
    public void updateProfilePicture(String userName, MultipartFile profile) {
        if (profile == null || profile.isEmpty()) {
            throw new IllegalArgumentException("Profile picture file is null or empty");
        }

        Nurse nurse = nurseRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("Nurse not found with username: " + userName));

        String pathProfile = BucketName.PROFILE_IMAGE.getBucketName();
        log.info("path: {}", pathProfile);

        String originalFilename = StringUtils.cleanPath(profile.getOriginalFilename());
        String fileExtension = StringUtils.getFilenameExtension(originalFilename);
        String profileName = String.format("%s-%s-%s.%s",
                StringUtils.getFilenameExtension(originalFilename),
                nurse.getUserName(),
                UUID.randomUUID(),
                fileExtension);

        try {
            // Saving profile picture to s3
            fileStore.save(pathProfile, profileName, profile);

            // Saving image path in database for retrieving image from s3
            nurse.setProfileImageLink(profileName);
            nurseRepository.save(nurse);
        } catch (IOException e) {
            log.error("Error saving profile picture", e);
            throw  new IllegalStateException(e);
        }
    }
}
