class Twixer < ActiveRecord::Base
  authenticates_with_sorcery!
end
