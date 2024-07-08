package com.abhay.booking_service.utils;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

public class DateUtils {
    public static LocalDate getTwoDayAfterCurrentDate(){
        return LocalDate.now().plusDays(2);
    }
    public static LocalDate getEndOfCurrentMoth(){
        return LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
    }
}
