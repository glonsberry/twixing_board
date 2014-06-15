class CreateTwixNotes < ActiveRecord::Migration
  def change
    create_table :twixnotes do |t|
    
      t.string :frequency

      t.timestamps
    end
  end
end
