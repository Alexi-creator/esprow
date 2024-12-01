import React from 'react';

import clsx from 'clsx';
import generated from '@stubs/generated.json';

import styles from './EditableList.module.scss';

export const EditableList = () => {
	const [state, setState] = React.useState<any>(generated);

	return (
		<div
			className={clsx(styles.root)}
		>
			<ul>
				{state.map((item: any) => (<li>{item.toString()}</li>))}
			</ul>
		</div>
	);
};
