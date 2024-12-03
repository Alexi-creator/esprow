import React from 'react';

import { EditableListProps, GeneratedProps, TemporaryChanges } from '../types';
import { EditableRow } from '../EditableRow';

import styles from './styles.module.scss';

export const EditableList: React.FC<EditableListProps> = ({ list }) => {
	const [stateList, setStateList] = React.useState<GeneratedProps[]>(list);
	const temporaryChanges = React.useRef<TemporaryChanges>({});

	return (
		<ul className={styles.root}>
			{stateList.map((item: GeneratedProps) => (
				<li className={styles.item} key={item.id}>
					<EditableRow item={item} setStateList={setStateList} temporaryChanges={temporaryChanges.current} />
				</li>
			))}
		</ul>
	);
};
