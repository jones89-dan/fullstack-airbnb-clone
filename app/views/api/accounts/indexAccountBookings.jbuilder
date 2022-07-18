json.bookings do
  json.array! @bookings do |booking|
    json.id             booking.id
    json.start_date     booking.start_date
    json.end_date       booking.end_date
    json.property_id    booking.property_id
    json.propertyTitle  booking.property.title
    json.paid           booking.is_paid?

    json.property do
      json.id             booking.property.id
      json.title          booking.property.title
      json.city           booking.property.city
      json.property_type  booking.property.property_type
      json.host           booking.property.user.username
    end
  end
end
