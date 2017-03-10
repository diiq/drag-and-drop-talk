module AuthorizationControllerSpecHelper
  def stub_sign_in(user)
    allow(controller).to receive(:current_user).and_return(user)
  end

  def stub_sign_out
    allow(controller).to receive(:current_user).and_return(nil)
  end
end
