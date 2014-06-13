require 'rails_helper'

RSpec.describe Twixer, :type => :model do
  before :each do
    @twixer = Twixer.new(email: "gardner@gardner.com", password: "gardner1")
  end

  it "has 2 parameters and returns a Twixer object" do
    expect(@twixer).to be_an_instance_of(Twixer)
  end

  it "can be saved to the database" do
    @twixer = Twixer.new
  end

  it "has a changeable email" do 
    expect(@twixer.email).to eq 'gardner@gardner.com'
    @twixer.email = 'gardner@gardner.com'
    expect(@twixer.email).to eq 'gardnernew@gardner.com'
  end

  it "can create a new Twixing Board" do
    twixer.twixingboard = Twixingboard.new
  end
end


# RSpec.describe Twixing_Board, :type => :model do
#   before :each do
#     @twixing_board = Twixing_Board.new(user_id: "1", twix_notes: "123", board_id: "2")
#   end

#   it "starts with 0 twit_notes" do
#       @twixing_board.should have(0).twix_notes
#     end
#   it "can get accept new twix_notes" do
#       @twixing_board.twix_notes << Object.new
#     end  
# end

