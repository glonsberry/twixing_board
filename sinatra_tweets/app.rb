

# require 'tweetstream'

# TweetStream.configure do |config|
#   config.consumer_key       = ENV['TWITTER_API_KEY']
#   config.consumer_secret    = ENV['TWITTER_API_SECRET']
#   config.oauth_token        = ENV['TWITTER_ACCESS_TOKEN']
#   config.oauth_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
#   config.auth_method        = :oauth
# end

# # This will pull a sample of all tweets based on
# # your Twitter account's Streaming API role.
# TweetStream::Client.new.sample do |status|
#   # The status object is a special Hash with
#   # method access to its keys.
#   puts "#{status.text}"
# end

require 'twitter'

# client = Twitter::Streaming::Client.new do |config|
#   config.consumer_key        = ENV['TWITTER_API_KEY']
#   config.consumer_secret     = ENV['TWITTER_API_SECRET']
#   config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
#   config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
# end

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV['TWITTER_API_KEY']
  config.consumer_secret     = ENV['TWITTER_API_SECRET']
  config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
  config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
end

# client.sample do |object|
#   puts object.text if object.is_a?(Twitter::Tweet)
# end

# client.search("to:justinbieber marry me", :result_type => "recent").take(3).each do |tweet|
#   puts tweet.text
# end
tweetsArr = []
client.search("2014-06-11", :result_type => "recent").take(100).each do |tweet|
  tweetsArr << tweet.text + " " + tweet.created_at.to_s

end
puts tweetsArr

#tweets = client.search("moon").text
