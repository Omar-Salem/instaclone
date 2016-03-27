class ChangeImagesTable4 < ActiveRecord::Migration
  def change
    add_column :images, :href, :string
  end
end
