'use client';
import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function PathParameters() {
  const [a, setA] = useState('34');
  const [b, setB] = useState('23');
  return (
    <div>
      <h3>Path Parameters</h3>
      <FormControl
        className='mb-2'
        id='wd-path-parameter-a'
        type='number'
        defaultValue={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        className='mb-2'
        id='wd-path-parameter-b'
        type='number'
        defaultValue={b}
        onChange={(e) => setB(e.target.value)}
      />
    <button
      className='btn btn-primary me-2'
      id='wd-path-parameter-add'
      type='button'
      onClick={() => (window.location.href = `${HTTP_SERVER}/lab5/add/${a}/${b}`)}
    >
      Add {a} + {b}
    </button>
    <button
      className='btn btn-danger me-2'
      id='wd-path-parameter-subtract'
      type='button'
      onClick={() => (window.location.href = `${HTTP_SERVER}/lab5/subtract/${a}/${b}`)}
    >
      Subtract {a} - {b}
    </button>
    <button
      className='btn btn-success me-2'
      id='wd-path-parameter-multiply'
      type='button'
      onClick={() => (window.location.href = `${HTTP_SERVER}/lab5/multiply/${a}/${b}`)}
    >
      Multiply {a} * {b}
    </button>

    <button
      className='btn btn-success me-2'
      id='wd-path-parameter-divide'
      type='button'
      onClick={() => (window.location.href = `${HTTP_SERVER}/lab5/divide/${a}/${b}`)}
    >
      Divide {a} / {b}
    </button>
      
      <hr />
    </div>
  );
}
