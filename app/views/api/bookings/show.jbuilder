json.booking do
    json.id               @booking.id
    json.property_id      @booking.property_id
    json.start_date       @booking.start_date
    json.end_date         @booking.end_date
    json.paid             @booking.is_paid?
    json.user             @booking.user.username

    json.property do
      json.id               @booking.property.id
      json.title            @booking.property.title
      json.city             @booking.property.city
      json.property_type    @booking.property.property_type
      json.host             @booking.property.user.username
      if @booking.property.image.attached?
            json.image_url @booking.property.image.blob.service_url
      else
            json.image_url @booking.property.image_url
      end
    end
end
