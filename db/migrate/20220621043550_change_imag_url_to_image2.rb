class ChangeImagUrlToImage2 < ActiveRecord::Migration[6.1]
  def change
    change_column :properties, :image_url, :string
  end
end
