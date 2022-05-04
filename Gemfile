source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"
gem 'devise'
gem 'activeadmin'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.2", ">= 7.0.2.3"
gem 'fog-aws'
gem 'carrierwave'
gem 'fast_jsonapi'

gem "sprockets-rails"

gem "pg"
gem "puma", "~> 5.0"
gem "jsbundling-rails"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

gem "bootsnap", require: false
gem "sassc-rails"

gem "rqrcode"
group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "byebug"
  gem 'dotenv-rails'
end

group :development do
  gem "web-console"
end

group :test do
  gem "rspec-rails"
  gem 'shoulda-matchers'
end
