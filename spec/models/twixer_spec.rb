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

end


