class CreateTwixNotes < ActiveRecord::Migration
  def change
    create_table :twix_notes do |t|
      t.integer :tweet_id
      t.integer :frequency

      t.timestamps
    end
  end
end
