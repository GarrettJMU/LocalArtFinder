require 'test_helper'

class UsertypesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get usertypes_index_url
    assert_response :success
  end

end
