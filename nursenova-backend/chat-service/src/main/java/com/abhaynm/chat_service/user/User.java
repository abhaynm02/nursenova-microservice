package com.abhaynm.chat_service.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
@ToString
public class User {
      @Id
      private String id;
      private String name;
      private Status status;

}

