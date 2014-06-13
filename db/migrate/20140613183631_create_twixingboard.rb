class CreateTwixingboard < ActiveRecord::Migration
  def change
    create_table :twixingboards do |t|
      t.string :name
      t.integer :twixnotes_id
      t.integer :twixer_id

    end
  end
end
