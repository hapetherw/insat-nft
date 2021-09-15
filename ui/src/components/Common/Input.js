import React from 'react'

const Input = ({
  label,
  type,
  onChange,
  value = '',
  disabled = false
}) => (
  <div className="form-input">
    <label htmlFor="input-box">{label}</label>
    <input
      id="input-box"
      type={type}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  </div>
)

export default Input;