import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const messages_provider_global = {
  // Applicable for all fields
  'required': 'Trường này không được để trống',
  'maxLength': 'Tối đa {{max}} ký tự',
  'minLength': 'Tối thiểu {{min}} ký tự',
  'number': '{{field}} phải là số',
  'string': 'Định dạng không hợp lệ',
  'email': 'Email không hợp lệ',
  'date': 'Ngày tháng không hợp lệ',
  'regex': 'Định dạng không hợp lệ',
  'database.unique': 'Trường này phải là duy nhất',
  'exists': 'Trường này đã tồn tại trên hệ thống',
  // Error message for the username field
  'enum': 'Trường không hợp lệ',
  'username.required': 'Vui lòng nhập tên tài khoản của bạn!',
}

vine.messagesProvider = new SimpleMessagesProvider(messages_provider_global)
