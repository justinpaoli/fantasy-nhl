import { useState, Dispatch, SetStateAction } from 'react';

const useFormInputData = (inputs: number) => {
  const [state, setState] = useState('default');
  const [errorMsgs, setErrorMsgs] = useState(['']);
  const fields: Array<any> = [];
  const setters: Array<Dispatch<SetStateAction<any>>> = [];
  while (inputs--) [fields[inputs], setters[inputs]] = useState(null);

  return { state, setState, fields, setters, errorMsgs, setErrorMsgs };
};

export default useFormInputData;