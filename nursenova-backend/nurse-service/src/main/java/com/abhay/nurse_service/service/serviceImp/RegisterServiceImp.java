package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.bucket.BucketName;
import com.abhay.nurse_service.dto.LanguageDto;
import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.NurseRequest;
import com.abhay.nurse_service.dto.RequestApproveDto;
import com.abhay.nurse_service.exceptions.customexceptions.DuplicateUsernameException;
import com.abhay.nurse_service.filestore.FileStore;
import com.abhay.nurse_service.model.Gender;
import com.abhay.nurse_service.model.Language;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.repository.LanguageRepository;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.service.RegisterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
@Slf4j
public class RegisterServiceImp implements RegisterService {

    private final NurseRepository nurseRepository;
    private final LanguageRepository languageRepository;
    private  final FileStore fileStore;

    public RegisterServiceImp(NurseRepository nurseRepository, LanguageRepository languageRepository, FileStore fileStore) {
        this.nurseRepository = nurseRepository;
        this.languageRepository = languageRepository;
        this.fileStore = fileStore;
    }

    public List<NurseDto>findAllNurses(){
         List<Nurse> nurses=nurseRepository.findAll();
         List<NurseDto>nurseDtos=new ArrayList<>();
         for (Nurse nurse:nurses){
             NurseDto nurseDto =new NurseDto();
             nurseDto.setId(nurse.getId());
             nurseDto.setFirstName(nurse.getFirstName());
             nurseDto.setLastName(nurse.getLastName());
             nurseDto.setUserName(nurse.getUserName());
             nurseDto.setAge(nurse.getAge());
             nurseDto.setGender(String.valueOf(nurse.getGender()));
             nurseDto.setAddress(nurse.getAddress());
             nurseDto.setPin(nurse.getPin());
             nurseDto.setEducation(nurse.getEducation());
             nurseDto.setExperience(nurse.getExperience());
             nurseDto.setVerified(nurse.isVerified());
             nurseDto.setPhone(nurse.getPhone());
             nurseDto.setProfileImageLink(fileStore.generateUrl(nurse.getProfileImageLink()));
             nurseDto.setCertificateImageLink(fileStore.generateUrl(nurse.getCertificateImageLink()));
             List<LanguageDto>languageDtos=nurse.getLanguages().stream().map(language -> {
                 LanguageDto languageDto =new LanguageDto();
                 languageDto.setId(language.getId());
                 languageDto.setLanguage(language.getLanguage());
                return languageDto;
             }).toList();
            nurseDto.setLanguages(languageDtos);
            nurseDtos.add(nurseDto);

         }

         return nurseDtos;
    }

    @Override
    public void updateNurseDetails(NurseRequest request, MultipartFile profile, MultipartFile certificate) throws IOException {
         Optional< Nurse> OptionalNurse =nurseRepository.findByUserName(request.getUsername());
        if (OptionalNurse.isPresent()){
            throw new DuplicateUsernameException("The given user name is already is exists");
        }
        List<Language> languages = new ArrayList<>();
        Nurse nurse = new Nurse();

        nurse.setAge(request.getAge());
        nurse.setAddress(request.getAddress());
        nurse.setEducation(request.getEducation());
        nurse.setGender(Gender.valueOf(request.getGender()));
        nurse.setExperience(request.getExperience());
        nurse.setUserName(request.getUsername());
        nurse.setFirstName(request.getFirstName());
        nurse.setLastName(request.getLastName());
        nurse.setVerified(false);
        nurse.setPhone(request.getPhone());
        nurse.setPin(request.getPin());

        // Saving nurse first to generate ID
        nurse = nurseRepository.save(nurse);

        // Saving the languages in the language database and associating with the nurse
        for (String lng : request.getLanguages()) {
            Language language = new Language();
            language.setLanguage(lng);
            language.setNurseId(nurse);
            languageRepository.save(language);
            languages.add(language);
        }
        nurse.setLanguages(languages);
        //storing profile in s3
        String pathProfile =String.format("%s", BucketName.PROFILE_IMAGE.getBucketName());
        log.info("path:{}",pathProfile);
        String profileName=String.format("%s-%s",profile.getOriginalFilename(),request.getUsername());

        String certificateName =String.format("%s-%s",certificate.getOriginalFilename(),request.getUsername());
        try {
            //saving profile picture to s3
            fileStore.save(pathProfile,profileName,profile);
            //saving image path in database for retrieving image s3
            nurse.setProfileImageLink(profileName);
            fileStore.save(BucketName.PROFILE_IMAGE.getBucketName(), certificateName,certificate);
            nurse.setCertificateImageLink(certificateName);

          nurseRepository.save(nurse);
        }catch (IOException e){
            throw  new IllegalStateException(e);
        }
    }

    @Override
    public List<RequestApproveDto> findAllRequests() {

      return nurseRepository.findByIsVerified(false).stream().map(nurse ->new RequestApproveDto(
              nurse.getId(),
              nurse.getFirstName(),
              nurse.getLastName(),
              nurse.getUserName(),
              String.valueOf(nurse.getGender()),
              nurse.getPhone(),
              nurse.isVerified()
      )).toList();
    }

    @Override
    public NurseDto findNurse(long nurseId) {
        Optional<Nurse> nurses=nurseRepository.findById(nurseId);
        Nurse nurse =nurses.get();

            NurseDto nurseDto =new NurseDto();
            nurseDto.setId(nurse.getId());
            nurseDto.setFirstName(nurse.getFirstName());
            nurseDto.setLastName(nurse.getLastName());
            nurseDto.setUserName(nurse.getUserName());
            nurseDto.setAge(nurse.getAge());
            nurseDto.setGender(String.valueOf(nurse.getGender()));
            nurseDto.setAddress(nurse.getAddress());
            nurseDto.setPin(nurse.getPin());
            nurseDto.setEducation(nurse.getEducation());
            nurseDto.setExperience(nurse.getExperience());
            nurseDto.setVerified(nurse.isVerified());
            nurseDto.setPhone(nurse.getPhone());
            nurseDto.setProfileImageLink(fileStore.generateUrl(nurse.getProfileImageLink()));
            nurseDto.setCertificateImageLink(fileStore.generateUrl(nurse.getCertificateImageLink()));
            List<LanguageDto>languageDtos=nurse.getLanguages().stream().map(language -> {
                LanguageDto languageDto =new LanguageDto();
                languageDto.setId(language.getId());
                languageDto.setLanguage(language.getLanguage());
                return languageDto;
            }).toList();
            nurseDto.setLanguages(languageDtos);
        return nurseDto;
    }
    @Transactional
    @Override
    public void approveRequest(long nurseId, boolean status) {
            nurseRepository.verifyRequest(nurseId,status);
    }


}
