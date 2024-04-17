import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function HookComponent() {
  const [title, setTitle] = useState(' hook style component');

  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => setTitle('变啦！'), 3000);
    console.log('路由传参：id =', id);
  }, []);
  return <div>{title}</div>;
}
