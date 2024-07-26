package com.abhay.notification_service.email;

import com.abhay.notification_service.dto.BookingNotification;
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
    public void sendBookingConfirmation(BookingNotification booking) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(booking.getEmail());
        helper.setSubject("Your Nuresenova Booking Confirmation");

        String htmlContent = """
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
            .header { background-color: #4A90E2; color: white; text-align: center; padding: 30px 20px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.8; }
            .content { padding: 30px; color: #333; }
            .booking-details { background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-top: 20px; }
            .booking-details h2 { margin-top: 0; color: #4A90E2; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .detail-label { font-weight: bold; color: #666; }
            .highlight { background-color: #4A90E2; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; }
            .footer { background-color: #333; color: white; text-align: center; padding: 20px; font-size: 14px; }
            .cta-button { display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmed!</h1>
                <p>Thank you for choosing Nuresenova</p>
            </div>
            <div class="content">
                <p>Dear Valued Guest,</p>
                <p>We're thrilled to confirm your upcoming stay with Nuresenova. Get ready for an exceptional experience!</p>
                
                <div class="booking-details">
                    <h2>Your Reservation Details</h2>
                    <div class="detail-row">
                        <span class="detail-label">Service:</span>
                        <span>${booking.getServiceName()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-in:</span>
                        <span>${booking.getStaringDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy"))}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-out:</span>
                        <span>${booking.getEndDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy"))}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Total Price:</span>
                        <span class="highlight">$${String.format("%.2f", booking.getTotalPrice() / 100.0)}</span>
                    </div>
                </div>
                
                <p>We're looking forward to welcoming you and ensuring your stay is nothing short of amazing.</p>
                <p>If you need to make any changes or have any questions, please don't hesitate to reach out to us.</p>
                
                <a href="#" class="cta-button">Manage Your Booking</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 Nuresenova. All rights reserved.</p>
                <p>123 Wellness Street, Health City, HC 12345</p>
            </div>
        </div>
    </body>
    </html>
    """;

        helper.setText(htmlContent, true);
        javaMailSender.send(message);
    }

    public void sendBookingCancellationNotification(BookingNotification booking) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(booking.getEmail());
        helper.setSubject("Important: Your Nuresenova Booking Update");

        String htmlContent = """
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
            .header { background-color: #E74C3C; color: white; text-align: center; padding: 30px 20px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.8; }
            .content { padding: 30px; color: #333; }
            .booking-details { background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-top: 20px; }
            .booking-details h2 { margin-top: 0; color: #E74C3C; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .detail-label { font-weight: bold; color: #666; }
            .cancellation-reason { background-color: #FFF3F3; border-left: 4px solid #E74C3C; padding: 15px; margin-top: 20px; }
            .footer { background-color: #333; color: white; text-align: center; padding: 20px; font-size: 14px; }
            .cta-button { display: inline-block; background-color: #3498DB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Cancellation Notice</h1>
                <p>We apologize for any inconvenience</p>
            </div>
            <div class="content">
                <p>Dear Valued Guest,</p>
                <p>We regret to inform you that your booking with Nuresenova has been cancelled by the assigned nurse. We understand this may cause inconvenience, and we sincerely apologize.</p>
                
                <div class="booking-details">
                    <h2>Cancelled Booking Details</h2>
                    <div class="detail-row">
                        <span class="detail-label">Service:</span>
                        <span>${booking.getServiceName()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Original Start Date:</span>
                        <span>${booking.getStaringDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy"))}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Original End Date:</span>
                        <span>${booking.getEndDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy"))}</span>
                    </div>
                </div>
                
                <div class="cancellation-reason">
                    <strong>Reason for cancellation:</strong>
                    <p>${booking.getMessage}</p>
                </div>
                
                <p>We value your trust in Nuresenova and would like to offer you assistance in rebooking your service or exploring alternative options.</p>
                
                <p>Our customer service team is ready to help you with any questions or concerns you may have regarding this cancellation.</p>
                
                <a href="#" class="cta-button">Contact Customer Service</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 Nuresenova. All rights reserved.</p>
                <p>123 Wellness Street, Health City, HC 12345</p>
            </div>
        </div>
    </body>
    </html>
    """;

        helper.setText(htmlContent, true);
        javaMailSender.send(message);
    }

}
