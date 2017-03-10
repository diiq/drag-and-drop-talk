class ApplicationMailer < ActionMailer::Base
  include InvitationUrlHelper
  default from: 'hello@moon-ladder.com'
  layout 'mailer'
  helper :invitation_url
end
