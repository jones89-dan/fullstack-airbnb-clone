class ChangeImagUrlToImage < ActiveRecord::Migration[6.1]
  def change
    change_column :properties, :image_url, :image
  end
end
