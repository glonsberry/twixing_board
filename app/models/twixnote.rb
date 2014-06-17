class Twixnote < ActiveRecord::Base
  belongs_to :twixingboard

  def get_twixnote(search_term)
    tweetsArr = []
    twixnote = {}
    tweetsTextArr = []
    mood = { :joy => 1, :sadness => 1, :anger => 1, :surprise => 1, :fear => 1, :disgust => 1, :ambiguous => 1 }
    mood_val = ""
    moodArr = []


    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_API_KEY']
      config.consumer_secret     = ENV['TWITTER_API_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end

    client.search(search_term, :result_type => "recent", :lang => "en").take(100).each do |tweet|
      tweetsArr << tweet.created_at
      tweetsTextArr << tweet.text
    end

    if (tweetsArr.first - tweetsArr.last) != 0
      frequency = tweetsArr.length/(tweetsArr.first - tweetsArr.last)
    else
      frequency = 100
    end

    tweetsTextArr.each do |tweet|
    tweetFixed = tweet.gsub(/\W/," ")
    emotion = SadPanda.emotion(tweetFixed)

    moodArr << emotion
       case emotion
       when "joy"
        mood[:joy] += 1
       when "anger"
        mood[:anger] += 1
       when "sadness"
        mood[:sadness] += 1
       when "disgust"
        mood[:disgust] += 1
       when "surprise"
        mood[:surprise] += 1
       when "fear"
        mood[:fear] += 1
       else
        mood[:ambiguous] += 1
       end

    end
    mood[:ambiguous] = 0
    mood_val =  mood.max_by{|k,v| v}[0].to_s
    twixnote = { :name => search_term, :frequency => frequency, :mood => mood_val }
  end

end
