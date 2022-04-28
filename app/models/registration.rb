class Registration < ApplicationRecord
  has_many :participants
  has_many :attachments
  validates_presence_of :tipo_de_comprobante, :categoria, :uuid
end
