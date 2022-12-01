import React from 'react';

type Props = {
  name: string;
  errors: any;
  register: any;
  title: string;
  type?: string;
};

const Input = ({ name, title, errors, register, ...rest }: Props) => {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        placeholder={title}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...register('hierarchy', { required: true, maxLength: 20 })}
        {...rest}
      />
      {/* <span>{errors[name]}</span> */}
    </>
  );
};

export default Input;
