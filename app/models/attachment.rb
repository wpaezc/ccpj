class Attachment < ApplicationRecord
  mount_uploader :file, AttachmentUploader
  validates_presence_of :resource_type, :resource_id, :file, :name, :uuid, :extension

  IMAGE_EXTENSIONS = %w[png jpg jpeg gif heic].freeze

  def is_image?
    IMAGE_EXTENSIONS.include?((self.extension || "").downcase)
  end
 
end
