json.booking do
    json.id          @booking.id
    json.property_id @booking.property_id
    json.start_date  @booking.start_date
    json.end_date    @booking.end_date
    json.paid        @booking.is_paid?
    json.user        @booking.user.username
end
