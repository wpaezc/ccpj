require 'rails_helper'

describe Participant, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:apellido_paterno) }
    it { should validate_presence_of(:apellido_materno) }
    it { should validate_presence_of(:nombres) }
    it { should validate_presence_of(:document_identidad) }
    it { should validate_presence_of(:celular) }
    it { should validate_presence_of(:correo) }
    it { should validate_presence_of(:pais) }
  end
end
