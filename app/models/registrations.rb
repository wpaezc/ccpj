class Registrations
  def initialize(resource_type, resource_id, data)
    @resource_type = resource_type
    @resource_id = resource_id
    @data = data
  end

  def self.signed_urls(resource_type, resource_id, data)
    att = new(resource_type, resource_id, data)
    att.signed_urls
  end

  def self.create(organization, user, resource_type, resource_id, data)
    att = new(organization, user, resource_type, resource_id, data)
    att.create
  end

  def isNotViewableInBrowser(extension)
    !["png", "gif","jpeg", "jpg","pdf"].include?(extension&.downcase)
  end

  def signed_urls
    upload_base_path = "uploads/#{@resource_type}/#{@resource_id}"
    fog = Fog::Storage.new({provider: 'AWS', region: ENV['AWS_REGION'], aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'], aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'] })
    expiration = Time.now + 1.days
    files = {}

    @data.each do |file|
      file = JSON.parse(file)
      name = file['name'].sub(/\..*/, '') || ""
      file_name = "#{name.parameterize}-#{file['uuid']}.#{file['extension']}"
      upload_path = "#{upload_base_path}/#{file_name}"
      content_type = file['type']
      request_headers = { 'Content-Type' => content_type }

      if isNotViewableInBrowser(file['extension'])
        request_headers['Content-Type'] = 'binary/octet-stream'
        request_headers['Content-Disposition'] = 'attachment'
      end

      url =  fog.put_object_url(ENV['S3_BUCKET'], upload_path, expiration, request_headers, {})
      files[file['uuid']] = {
        uuid: file['uuid'],
        upload_url: url,
        filename: file_name,
        original_name: file['name'],
      }
    end

    files
  end

  def create
    map = {
      organization_id: @organization.id,
      resource_type: @resource_type,
      resource_id: @resource_id,
      name: @data['original_name'],
      uuid: @data['uuid'],
      extension: @data['extension']&.downcase,
      user_id: @user.id,
      file: @data['filename']
    }
    attachment = Attachment.new(map)
    attachment.save(validate: false)
    attachment.update_column(:file, @data['filename'])
    attachment.reload

    if attachment.is_image?
      ProcessImageAttachment.perform_later(attachment.id)
    elsif attachment.is_pdf? && @resource_type == 'project_tasks'
      ptt = ProjectTask.find(@resource_id).project_task_type
      ProcessPdfAttachment.perform_later(attachment.id) if ptt.effective_convert_pdf_attachments_to_images
    end

    attachment
  end

end
