require 'rails_helper'

describe Registration, type: :model do
  describe 'associations' do
    it { should have_many(:participants) }
    it { should have_many(:attachments) }
  end

  describe 'validations' do
    it { should validate_presence_of(:tipo_de_comprobante) }
    it { should validate_presence_of(:categoria) }
    it { should validate_presence_of(:uuid) }
  end
end
