class AttachmentUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  configure do |c|
     c.fog_public = false # or false
     c.fog_directory = ENV['S3_BUCKET']
  end

  def store_dir
    "uploads/#{model.resource_type}/#{model.resource_id}"
  end

  def filename
    super.chomp(File.extname(super)) + ".#{model.extension}" if original_filename.present?
  end
 
end
