import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/SwitchUnstyled';

const blue = {
  700: '#0059B2',
};

const grey = {
  400: '#BFC7CF',
  800: '#2F3A45',
};

const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 36px;
`;

const SwitchInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')`
  position: absolute;
  display: block;
  background-color: ${blue[700]};
  width: calc(50% - 20px);
  height: 100%;
  border-radius: 8px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(200px);
    background-color: #009b9f;
  }

  &.unchecked {
    background-color: ${blue[700]};
  }
`;

function MUISwitch(props) {
  const { getInputProps, checked, disabled, focusVisible} = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible
  };

  const SwitchTrack = styled('span')(({ theme }) => ({
    borderRadius: '10px',
    padding: '5px',
    height: '100%',
    display: 'block',
    boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'white',
    '&:before, &:after': {
      position: 'absolute',
      top: '40%',
    },
    '&:before': {
      content: checked ? '"Projects"' : '"Contractors"',
      [checked ? 'left' : 'right']: 50,
    },
  }));

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white' }}>
            {checked ? 'Contractors' : 'Projects'}
          </div>
        </SwitchThumb>
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}

export default function UseSwitchesCustom(props) {
  return <MUISwitch defaultChecked {...props} />;
}
