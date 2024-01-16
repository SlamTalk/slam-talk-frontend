import React from 'react';
import { TbMoodSearch, TbClipboardText } from 'react-icons/tb';
import { PiChatsCircle, PiMapPinBold } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';

const Footer = () => (
  <div className="footer fixed bottom-0 w-full border-t-1 p-4">
    <div className="flex items-center justify-around">
      <AiOutlineHome size={28} />
      <TbClipboardText size={28} />
      <PiMapPinBold size={28} />
      <PiChatsCircle size={28} />
      <TbMoodSearch size={28} />
    </div>
  </div>
);

export default Footer;
