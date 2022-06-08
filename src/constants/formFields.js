const registerFields = [
  {
    label: "First Name",
    placeholder: "First Name",
    type: "text",
    name: "firstName",
    required: true
  },
  {
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
    name: "lastName",
    required: true
  },
  {
    label: "Email",
    placeholder: "Email",
    type: "email",
    name: "email",
    required: true
  },
  {
    label: "Phone",
    placeholder: "Phone",
    type: "text",
    name: "phone",
    required: true
  },
]

const loginFields = [
  {
    label: "Email",
    placeholder: "Email",
    type: "email",
    name: "email",
    required: true
  },
  {
    label: "Password",
    placeholder: "Password",
    type: "password",
    name: "password",
    required: true
  },
]

export { registerFields, loginFields }
