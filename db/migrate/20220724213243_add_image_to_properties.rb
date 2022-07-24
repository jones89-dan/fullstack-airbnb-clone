class AddImageToProperties < ActiveRecord::Migration[6.1]
  def change
    add_column :properties, :image_url, :string
  end
end
