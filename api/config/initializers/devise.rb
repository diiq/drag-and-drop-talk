Devise.setup do |config|
  config.scoped_views = true
  config.mailer_sender = "hello@moon-ladder.com"
  config.mailer = "ApplicationMailer"
end
