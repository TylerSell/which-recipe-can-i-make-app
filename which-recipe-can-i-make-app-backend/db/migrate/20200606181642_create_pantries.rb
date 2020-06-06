class CreatePantries < ActiveRecord::Migration[6.0]
  def change
    create_table :pantries do |t|
      t.string :name
      t.string :quantity
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
