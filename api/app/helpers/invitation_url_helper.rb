module InvitationUrlHelper
  def frontend_invitation_url(user, token)
    ENV['FRONTEND_URL'] + "?#/invitation/#{token}"
  end
end
