package com.abhay.notification_service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {
    private final JavaMailSender javaMailSender;

    public EmailUtil(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    public void sentOtpEmail(String email, String otp) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Email verification from Nuresenova");
        String htmlContent = "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; }" +
                ".container { max-width: 600px; margin: auto; padding: 20px; }" +
                ".header { background-color: #007bff; color: white; text-align: center; padding: 20px; }" +
                ".content { padding: 20px; background-color: #f7f7f7; border-radius: 10px; }" +
                ".footer { background-color: #007bff; color: white; text-align: center; padding: 10px; border-radius: 0 0 10px 10px; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h1>Welcome to Nuresenova</h1>" +
                "<p>Lighting the way to wellness</p>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Dear User,</p>" +
                "<p>Your One Time Password (OTP) for login is: <strong>" + otp + "</strong></p>" +
                "<p>Please use this OTP to login to your account. Note that the OTP is only valid for two minutes.</p>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>Best Regards,<br/>The Nuresenova Team</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        helper.setText(htmlContent, true);
        javaMailSender.send(message);
    }

}
