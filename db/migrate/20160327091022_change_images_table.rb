class ChangeImagesTable < ActiveRecord::Migration
  def change
    change_column_null :images, :img_id, false
    change_column_null :images, :low_resolution, false
    change_column_null :images, :thumbnail, false
    change_column_null :images, :standard_resolution, false
    change_column_null :images, :user_id, false
  end
end
