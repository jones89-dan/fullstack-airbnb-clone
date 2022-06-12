json.success true
json.property do
  json.image    url_for(@property.image) if @property.image.attached?
end
