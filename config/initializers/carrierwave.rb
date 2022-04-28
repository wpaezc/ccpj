CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => ENV['AWS_ACCESS_KEY_ID'],                        # required
    :aws_secret_access_key  => ENV['AWS_SECRET_ACCESS_KEY'],                        # required
    :region                 => ENV['AWS_REGION'] || 'us-east-1'               # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = ENV['S3_BUCKET'] # required
  config.fog_public     = false # optional, defaults to true

  fog_attributes = {}
  fog_attributes['Cache-Control'] = 'max-age=315576000'

  if ENV['S3_BUCKET_ENCRYPTION_KEY_ID'].present? 
    fog_attributes[:encryption] = 'aws:kms'
    fog_attributes['x-amz-server-side-encryption'] = 'AES256'
    fog_attributes['x-amz-server-side-encryption-aws-kms-key-id'] = ENV['S3_BUCKET_ENCRYPTION_KEY_ID']
  end

  config.fog_authenticated_url_expiration = 604800
  config.cache_dir = "#{Rails.root}/tmp/uploads"

  if Rails.env.test?
    Fog::Mock.reset
    Fog.mock!

    Fog::Storage.new(
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['AWS_REGION'] || 'us-east-1',
      provider: 'AWS'
    ).tap do |connection|
      connection.directories.create(key: ENV['S3_BUCKET'])
    end
  end
end
