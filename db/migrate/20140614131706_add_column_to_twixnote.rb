class AddColumnToTwixnote < ActiveRecord::Migration
  def change
    add_column :twixnotes, :name, :string
  end
end
