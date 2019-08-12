module UsersHelper
  class UsersHelper
    def initialize; end

    def get_user(id)
      User.find(id)
    end

    def get_username(id)
      get_user(id).username
    end
  end
end
