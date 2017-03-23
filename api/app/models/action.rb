class Action < ActiveRecord::Base
  belongs_to :person

  def emoji
    person.emoji
  end
end
