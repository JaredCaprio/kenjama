import React, { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
	bgColor?: string;
	textColor?: string;
	willHover: boolean;
	href?: string;
	children: ReactNode;
};

const Button = (props: Props) => {
	let className = `${props.bgColor} ${
		props.textColor
	} px-2 py-1 rounded-md transition-all duration-500
		${props.willHover ? 'hover:bg-tertiary/100' : ''}`;

	return props.href ? (
		<Link className={className} href={props.href}>
			{props.children}
		</Link>
	) : (
		<button type='button' className={className}>
			{props.children}
		</button>
	);
};

export default Button;
