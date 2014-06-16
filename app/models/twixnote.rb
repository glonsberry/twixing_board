class Twixnote < ActiveRecord::Base
  belongs_to :twixingboard

  def get_twixnote(search_term)
    tweetsArr=[]
    twixnote = {}
    moodArr = []


    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_API_KEY']
      config.consumer_secret     = ENV['TWITTER_API_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end

    client.search(search_term, :result_type => "recent").take(1).each do |tweet|
      tweetsArr << tweet.rate
    end
    frequency = tweetsArr.length/(tweetsArr.first - tweetsArr.last)
    total_tweets_string = tweetsArr.join
      # tweetsArr.each do |tweet|
      mood = SadPanda.emotion(total_tweets_string)
      #moodArr << SadPanda.emotion(tweet)
    end

    twixnote = { :name => search_term, :frequency => frequency, :mood => mood }
  end

end
