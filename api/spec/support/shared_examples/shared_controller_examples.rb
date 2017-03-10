shared_examples_for "an authenticated endpoint" do
  it "returns 401" do
    do_request
    expect(response.status).to eq(401)
  end
end

shared_examples_for "an unauthorized request" do
  it "returns 403" do
    do_request
    expect(response.status).to eq(403)
  end
end

shared_examples_for "a permissions-protected endpoint" do
  context "when requested without a proper auth token," do
    before do
      stub_sign_out
    end

    it_behaves_like "an authenticated endpoint"
  end

  context "when requested by a user without permission," do
    let(:_unauthorized_user) { FactoryGirl.create :user }
    before do
      stub_sign_in _unauthorized_user
    end

    it_behaves_like "an unauthorized request"
  end
end
