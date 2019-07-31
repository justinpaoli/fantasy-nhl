require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FantasyNhl
  class Application < Rails::Application
    config.generators do |g|
      g.template_engine false
      g.stylesheets false
      g.javascripts false
    end
  end
end
