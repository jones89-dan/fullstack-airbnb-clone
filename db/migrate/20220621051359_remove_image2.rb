class RemoveImage2 < ActiveRecord::Migration[6.1]
  def change
    remove_column :properties, :image
  end
end
