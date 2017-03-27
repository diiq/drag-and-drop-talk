class Action < ActiveRecord::Base
  belongs_to :person

  def emoji
    if person
      person.emoji
    else
      ""
    end
  end
end
