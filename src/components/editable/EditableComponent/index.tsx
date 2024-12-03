import React from 'react';

import {
	EditableComponentProps,
	GeneratedKeysProps, GeneratedProps, GeneratedValuesProps, TemporaryChanges,
} from '../types';

import styles from './styles.module.scss';
import { getPatternType } from '../utils';

const changeTemporary = (
	temporaryChanges: TemporaryChanges,
	id: string,
	key: GeneratedKeysProps,
	val: GeneratedValuesProps | undefined,
): void => {
	temporaryChanges[id] = {
		...temporaryChanges[id],
		[key]: val,
	};
};

const handleClick = (
	temporaryChanges: TemporaryChanges,
	id: string,
	title: GeneratedKeysProps,
	setStateList: React.Dispatch<React.SetStateAction<GeneratedProps[]>>,
) => {
	const temporaryValue = temporaryChanges[id]?.[title];

	if (temporaryValue !== undefined) {
		setStateList((prev: GeneratedProps[]) => {
			return prev.map((item: GeneratedProps) => (item.id === id ? { ...item, [title]: temporaryValue } : item));
		});

		changeTemporary(temporaryChanges, id, title, undefined);
	}
};

export const EditableComponent: React.FC<EditableComponentProps> = ({
	title,
	val,
	item,
	setStateList,
	temporaryChanges,
}): React.ReactNode | null => {
	const { id } = item;
	const type = typeof val;

	if (title === 'id') return null;

	const renderInput = (
		inputType: string,
		placeholder: string,
		onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
		restProps?: { defaultChecked: boolean },
	) => (
		<span className={styles.edit}>
			{inputType === 'textarea' ? (
				<textarea placeholder={placeholder} onChange={onChangeHandler} {...restProps} />
			) : (
				<input type={inputType} placeholder={placeholder} onChange={onChangeHandler} {...restProps} />
			)}
			<button
				className={styles.button}
				type="button"
				onClick={() => handleClick(temporaryChanges, id, title, setStateList)}
			>
				change
			</button>
		</span>
	);

	switch (type) {
	case 'boolean':
		return renderInput('checkbox', '', e =>
			changeTemporary(temporaryChanges, id, title, (e.target as HTMLInputElement).checked),
		{ defaultChecked: Boolean(val) });

	case 'number':
		return renderInput('number', 'Input number', e =>
			changeTemporary(temporaryChanges, id, title, Number(e.target.value)));

	case 'string': {
		const inputType = getPatternType(val as string);
		switch (inputType) {
		case 'email':
			return renderInput('email', 'Input email', e =>
				changeTemporary(temporaryChanges, id, title, e.target.value));

		case 'date':
			return renderInput('date', '', (e) => {
				const dateValue = e.target.value;
				if (!isNaN(Date.parse(dateValue))) {
					const isoString = new Date(dateValue).toISOString();
					changeTemporary(temporaryChanges, id, title, isoString);
				}
			});

		case 'textarea':
			return renderInput('textarea', 'Input text', e =>
				changeTemporary(temporaryChanges, id, title, e.target.value));

		default:
			return renderInput('text', 'Input text', e =>
				changeTemporary(temporaryChanges, id, title, e.target.value));
		}
	}

	default:
		return null;
	}
};
