import React from 'react';

import { EditableComponent } from '../EditableComponent';
import {
	EditableRowProps, GeneratedKeysProps, GeneratedProps, GeneratedValuesProps,
} from '../types';

import styles from './styles.module.scss';

export const renderValue = (key: GeneratedKeysProps, val: GeneratedValuesProps, item: GeneratedProps): React.ReactNode => {
	switch (key) {
	case 'isActive':
		return val ? 'Yes' : 'No';
	case 'picture':
		return <img width={32} height={32} src={String(val)} alt={item.name} />;
	case 'registered':
		if (typeof val === 'string' || typeof val === 'number') {
			return new Date(val).toLocaleDateString();
		}
		return 'Invalid date';

	default:
		return val;
	}
};

export const EditableRow: React.FC<EditableRowProps> = ({ item, setStateList, temporaryChanges }) => {
	const { id } = item;

	return Object.entries(item).map(([key, val]) => (
		<div key={`${id}-${key}`}>
			<span className={styles.title}>
				{key}
				:
			</span>
			{renderValue(key as GeneratedKeysProps, val, item)}
			<EditableComponent
				title={key as GeneratedKeysProps}
				val={val}
				item={item}
				setStateList={setStateList}
				temporaryChanges={temporaryChanges}
			/>
		</div>
	));
};
