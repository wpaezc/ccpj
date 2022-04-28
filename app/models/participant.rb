class Participant < ApplicationRecord
  belongs_to :registration

  validates_presence_of :apellido_paterno, :apellido_materno, :nombres, :document_identidad, :celular, :correo, :pais
end
