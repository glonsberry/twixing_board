class Twixingboard < ActiveRecord::Base
  has_many :twixnotes
  belongs_to :twixers

  def find_mood(search_term)
    tweetsArr=[]
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_API_KEY']
      config.consumer_secret     = ENV['TWITTER_API_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end
    client.search(search_term, :result_type => "recent").take(100).each do |tweet|
      tweetsArr << tweet.text
    end

  newArr = tweetsArr.join
  mood = SadPanda.emotion(newArr)

  end

end
