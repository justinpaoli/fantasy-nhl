class CreateLeagues < ActiveRecord::Migration[5.2]
  def change
    create_table :leagues do |t|
      t.integer :owner
      t.string :state
      t.string :name
      t.string :season
      t.string :rules
      t.string :team_ids

      t.timestamps
    end
  end
end
