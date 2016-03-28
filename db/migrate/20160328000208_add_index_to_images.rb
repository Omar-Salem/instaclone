class AddIndexToImages < ActiveRecord::Migration
  def change
    add_index :images, :user_id
  end
end
