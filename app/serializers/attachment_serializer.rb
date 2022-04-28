class AttachmentSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :uuid, :extension, :resource_type, :resource_id, :created_at

  attribute :file_url do |object|
    object.file_url(
      query: {
        "response-content-disposition" => %[filename="#{URI::DEFAULT_PARSER.escape(object.name.unicode_normalize(:nfc))}"],
      }
    )
  end
end
