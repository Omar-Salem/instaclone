class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :img_id
      t.string :low_resolution
      t.string :thumbnail
      t.string :standard_resolution
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
