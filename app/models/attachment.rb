class Attachment < ApplicationRecord
  mount_uploader :file, AttachmentUploader
  validates_presence_of :resource_type, :resource_id, :file, :name, :uuid, :extension
 
end
