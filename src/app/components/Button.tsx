import React from 'react';

type Props = {
	btnContent: string;
	bgColor?: string;
	textColor?: string;
	hover: boolean;
};

const Button = (props: Props) => {
	return (
		<button
			className={`${props.bgColor} ${props.textColor} px-2 py-1 rounded-md ${
				props.hover === true ? 'hover:bg-tertiary/100' : ''
			} transition-all duration-500`}
		>
			{props.btnContent}
		</button>
	);
};

export default Button;
