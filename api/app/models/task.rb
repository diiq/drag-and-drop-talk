class Task < ActiveRecord::Base
  has_many :estimates
  has_many :actions
end
