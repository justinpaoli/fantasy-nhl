class CreatePlayerTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :player_teams do |t|
      t.references :user, foreign_key: true
      t.references :league, foreign_key: true
      t.string :name
      t.string :roster

      t.timestamps
    end
  end
end
