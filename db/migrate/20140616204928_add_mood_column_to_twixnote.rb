class AddMoodColumnToTwixnote < ActiveRecord::Migration
  def change
    add_column :twixnotes, :mood, :string
 
  end
end
