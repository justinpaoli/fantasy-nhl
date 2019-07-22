import { useState, Dispatch, SetStateAction } from 'react';

const useFormInputData = (inputs: number) => {
  const [state, setState] = useState('default');
  const [errorMsgs, setErrorMsgs] = useState(['']);
  const fields: Array<string> = [];
  const setters: Array<Dispatch<SetStateAction<string>>> = [];
  while (inputs--) [fields[inputs], setters[inputs]] = useState('');

  return { state, setState, fields, setters, errorMsgs, setErrorMsgs };
};

export default useFormInputData;