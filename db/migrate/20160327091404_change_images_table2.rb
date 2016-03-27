class ChangeImagesTable2 < ActiveRecord::Migration
  def change
    add_index :images, :img_id, unique: true
  end
end
