package com.abhay.booking_service.service.serviceImp;

import com.abhay.booking_service.dto.*;
import com.abhay.booking_service.exceptions.coustomexceptions.BookingNotFoundException;
import com.abhay.booking_service.exceptions.coustomexceptions.SlotNotFoundException;
import com.abhay.booking_service.model.Booking;
import com.abhay.booking_service.model.BookingSlot;
import com.abhay.booking_service.model.BookingStatus;
import com.abhay.booking_service.model.Slot;
import com.abhay.booking_service.repository.BookingRepository;
import com.abhay.booking_service.repository.BookingSlotRepository;
import com.abhay.booking_service.repository.SlotRepository;
import com.abhay.booking_service.service.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingServiceImp implements BookingService {
    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;
    private final BookingSlotRepository bookingSlotRepository;
    private final KafkaTemplate<String, BookingNotification> kafkaTemplate;

    public BookingServiceImp(BookingRepository bookingRepository, SlotRepository slotRepository, BookingSlotRepository bookingSlotRepository, KafkaTemplate<String, BookingNotification> kafkaTemplate) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
        this.bookingSlotRepository = bookingSlotRepository;
        this.kafkaTemplate = kafkaTemplate;
    }


    @Transactional
    public void placeBooking(BookingRequestDto bookingRequestDto) {
        Booking booking = new Booking();
        booking.setNurseId(bookingRequestDto.getNurseId());
        booking.setUserId(bookingRequestDto.getUserId());
        booking.setServiceId(bookingRequestDto.getServiceId());
        booking.setServiceName(bookingRequestDto.getServiceName());
        booking.setDutyType(bookingRequestDto.getDutyType());
        booking.setStatus(BookingStatus.REQUESTED);
        booking.setAge(bookingRequestDto.getAge());
        booking.setPatientFullName(bookingRequestDto.getPatientFullName());
        booking.setGender(bookingRequestDto.getGender());
        booking.setMedicalDetails(bookingRequestDto.getMedicalDetails());
        booking.setFirstName(bookingRequestDto.getFirstName());
        booking.setLastName(bookingRequestDto.getLastName());
        booking.setAddress(bookingRequestDto.getAddress());
        booking.setPin(bookingRequestDto.getPin());

        List<BookingSlot> bookingSlots = createBookingSlots(bookingRequestDto.getSlotDtos(), booking);
        bookingSlots.sort((slot1, slot2) -> slot1.getDate().compareTo(slot2.getDate()));
        booking.setSlots(bookingSlots);
        booking.setStartDate(bookingSlots.get(0).getDate());
        booking.setEndDate(bookingSlots.get(bookingSlots.size()-1).getDate());
        booking.setTotalAmount(calculateTotalAmount(bookingRequestDto.getSlotDtos(), bookingRequestDto.getServicePrice()));
        booking.setTotalDays(bookingRequestDto.getSlotDtos().size());
        booking.setPaymentId(bookingRequestDto.getPaymentId());
        booking.setServicePrice(bookingRequestDto.getServicePrice());

        bookingRepository.save(booking);
        bookingSlotRepository.saveAll(bookingSlots);
    }

    @Override
    public Page<BookingResponse> findBookingsForNurse(Pageable page, String nurseId) {
        return bookingRepository.findByNurseId(page,nurseId).map(booking -> new BookingResponse(booking.getId(),
                booking.getUserId(),
                booking.getServiceName(),
                booking.getTotalDays(),
                booking.getStatus(),
                booking.getTotalAmount(),
                booking.getStartDate(),
                booking.getEndDate()));
    }

    @Override
    public ViewBooking findByBookingId(long bookingId) {
        Booking booking=bookingRepository.findById(bookingId).orElseThrow(()->new BookingNotFoundException("booking id is not valid "));
       ViewBooking response=new ViewBooking();
        response.setBookingId(booking.getId());
        response.setServiceName(booking.getServiceName());
        response.setServicePrice(booking.getServicePrice());
        response.setAddress(booking.getAddress());
        response.setAge(booking.getAge());
        response.setGender(booking.getGender());
        response.setFirstName(booking.getFirstName());
        response.setLastName(booking.getLastName());
        response.setPatientFullName(booking.getPatientFullName());
        response.setMedicalDetails(booking.getMedicalDetails());
        response.setPin(booking.getPin());
        response.setDutyType(booking.getDutyType());
        response.setStatus(booking.getStatus());
        response.setPaymentId(booking.getPaymentId());
        response.setTotalAmount(booking.getTotalAmount());
        response.setTotalDays(booking.getTotalDays());
        response.setStartDate(booking.getStartDate());
        List<SlotDto>slotDtos=booking.getSlots().stream().map(slot->{
            SlotDto slotDto=new SlotDto();
            slotDto.setId(slot.getId());
            slotDto.setNurseId(booking.getNurseId());
            slotDto.setDate(slot.getDate());
            return slotDto;
        }).toList();
        response.setSlotDtos(slotDtos);

        return response;
    }
    @Override
    public void updateBookingStatus(long bookingId, BookingStatus status) {
        Booking booking = findBookingById(bookingId);

        if (status.equals(BookingStatus.CONFIRMED)) {
            confirmBooking(booking);
        } else if (status.equals(BookingStatus.CANCELLED)) {
            cancelBooking(booking);
        } else {
            throw new IllegalArgumentException("Unsupported booking status: " + status);
        }

        bookingRepository.save(booking);
    }

    private Booking findBookingById(long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("The given booking id is not valid: " + bookingId));
    }

    private void confirmBooking(Booking booking) {
        BookingNotification notification = createBookingNotification(booking, "Your booking has been confirmed.");
        sendKafkaMessage(notification, "bookingAccept");
        booking.setStatus(BookingStatus.CONFIRMED);
    }

    private void cancelBooking(Booking booking) {
        BookingNotification notification = createBookingNotification(booking, "Your booking has been cancelled.");
        sendKafkaMessage(notification, "bookingCancel");
        changingSlotStatus(booking.getSlots());
        booking.setStatus(BookingStatus.CANCELLED);
    }

    private BookingNotification createBookingNotification(Booking booking, String message) {
        return BookingNotification.builder()
                .email(booking.getNurseId())
                .staringDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .serviceName(booking.getServiceName())
                .totalPrice(booking.getTotalAmount())
                .message(message)
                .build();
    }
    private void changingSlotStatus(List<BookingSlot>bookingSlots ){
        List<Slot>slots=new ArrayList<>();
        for (BookingSlot slot :bookingSlots){
            Slot s= slotRepository.findById(slot.getSlotId()).orElseThrow(() ->
                    new SlotNotFoundException("Slot not found with ID: " + slot.getSlotId()));
            s.setAvailable(true);
            slots.add(s);
        }
        slotRepository.saveAll(slots);
    }

    private void sendKafkaMessage(BookingNotification notification, String topic) {
        Message<BookingNotification> message = MessageBuilder
                .withPayload(notification)
                .setHeader(KafkaHeaders.TOPIC, topic)
                .build();
        kafkaTemplate.send(message);
    }
    private long calculateTotalAmount(List<SlotDto> slotDtos, long servicePrice) {
        return slotDtos.size() * servicePrice;
    }

    private List<BookingSlot> createBookingSlots(List<SlotDto> slotDtos, Booking booking) {
        return slotDtos.stream().map(slotDto -> {
            BookingSlot bookingSlot = new BookingSlot();
            bookingSlot.setSlotId(slotDto.getId());
            bookingSlot.setBooking(booking);
            bookingSlot.setDate(slotDto.getDate());

            Slot slot = slotRepository.findById(slotDto.getId()).orElseThrow(() ->
                    new SlotNotFoundException("Slot not found with ID: " + slotDto.getId()));
            slot.setAvailable(false);
            slotRepository.save(slot);

            return bookingSlot;
        }).collect(Collectors.toList());
    }
}
