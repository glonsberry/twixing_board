class AddColumnToTwixnotes < ActiveRecord::Migration
  def change
    add_column :twixnotes, :twixingboard_id, :integer
  end
end
