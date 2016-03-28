class ChangeTokensTable < ActiveRecord::Migration
  def change
    add_index :access_tokens, :token, unique: true
  end
end
