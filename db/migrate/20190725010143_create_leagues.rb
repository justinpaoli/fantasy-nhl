class CreateLeagues < ActiveRecord::Migration[5.2]
  def change
    create_table :leagues do |t|
      t.integer :owner
      t.string :rules
      t.string :teamIds

      t.timestamps
    end
  end
end
