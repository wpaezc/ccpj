class Registration < ApplicationRecord
  has_many :participants, dependent: :destroy
  has_many :attachments, dependent: :destroy
  validates_presence_of :tipo_de_comprobante, :categoria, :uuid
end
