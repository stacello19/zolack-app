import React from 'react';
import { TooltipCard, TooltipText, TooltipBox } from './styles';

const Tooltip = ({ children, content }: { children: React.ReactNode, content: React.ReactNode }) => {
  return (
    <TooltipCard>
      <TooltipText>
        {children}
      </TooltipText>
      <TooltipBox>
        {content}
      </TooltipBox>
    </TooltipCard>
  )
};

export default Tooltip;
