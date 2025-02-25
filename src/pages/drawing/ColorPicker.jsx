import React, { useState } from 'react';
import ColorPicker from 'react-pick-color';

const ColorPickerComponent = () => {
  

  return <ColorPicker color={color} onChange={color => setColor(color.hex)} />;
};
