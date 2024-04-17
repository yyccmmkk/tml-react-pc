import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '@s/index';
import { connect } from 'react-redux';

export default function HookComponent(props: any) {
  const [title, setTitle] = useState(' hook style component');
  const { code } = props;
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => props.updateCode(888888), 3000);
    console.log('路由传参：id =', id, '\n redux:code =', code);
  }, []);
  return <div>{title}</div>;
}

const mapStateToProps = (state: any) => {
  const {
    main: { code },
  } = state;
  return {
    code,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateToken: actions.updateToken,
      updateCode: actions.updateCode,
      asyncActionType: actions.asyncActionType,
    },
    dispatch
  );
const container = connect(mapStateToProps, mapDispatchToProps)(HookComponent);

export { container };
