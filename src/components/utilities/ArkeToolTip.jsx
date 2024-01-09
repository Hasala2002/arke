import React, { useState } from 'react';

const ArkeToolTip = ({ content, align, children, tooltipClassName = '', tooltipStyle = {} }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isTooltipVisible && (
        <div className={`tooltip tooltip-${align} ${tooltipClassName}`} style={tooltipStyle}>
          {content}
        </div>
      )}
      <style>
        {`
          .tooltip-container {
            position: relative;
            display: inline-block;
          }
          .tooltip {
            position: absolute;
            padding: 8px 12px;
            border: 0.5px solid rgba(255, 255, 255, 0.5);
            background-color: #000;
            color: #fff;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            font-weight: 300;
            font-size:12px;
            border-radius: 4px;
            white-space: nowrap;
            z-index: 999;
          }

          .tooltip-top {
            top: -5px;
            left: 50%;
            transform: translate(-50%, 0);
          }
        
          .tooltip-right {
            top: 50%;
            right: 0px;
            transform: translate(0%, 55%);
          }
        
          .tooltip-bottom {
            bottom: -40px;
            left: 50%;
            transform: translate(-50%, 0);
          }
        
          .tooltip-left {
            bottom: 50%;
            left: -5px;
            transform: translate(0, -50%);
          }
        `}
      </style>
    </div>
  );
};

export default ArkeToolTip;
